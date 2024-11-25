import { query, getDocs, updateDoc, arrayUnion, doc, getDoc, setDoc, addDoc, collection, limit, orderBy } from 'firebase/firestore' // adjust the imports based on your setup

export async function useSuggestions(key: string, manual_limit: number | undefined = undefined) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    const sug_limit = ref(10)
    const more_sugs = ref(true)
    const user = useCookie('user')


    const postSuggestion = async (data: Ref) => {
        const userRef = doc(db, "users", user?.value?.uid)
        const docRef = await addDoc(collection(db, "suggestions"), data);

        user.value.suggestions.push(docRef.id)

        await addVote(docRef.id)

        await updateDoc(userRef, {
            suggestions: arrayUnion(docRef.id)
        }, { merge: true })
    }

    const addVote = async (id) => {
        const userRef = doc(db, "users", user?.value?.uid)

        updateDoc(userRef, {
            upvoted: arrayUnion(id)
        }, { merge: true })
        const docRef = doc(db, "suggestions", id)
        const current_votes = (await getDoc(docRef)).data().votes
        await setDoc(docRef, {
            votes: current_votes + 1
        }, { merge: true });
    }

    // Use useAsyncData to fetch and cache episodes
    const { data: suggestions, status, refresh } = await useAsyncData(key, async () => {
        // Fetch season document to get the episode IDs



        const q = query(collection(db, 'suggestions'), limit(manual_limit || sug_limit.value), orderBy('votes', 'desc'))
        const sugs = await getDocs(q)

        if (sugs.docs.length < sug_limit.value) {
            more_sugs.value = false
        }


        // Return the episodes data
        return sugs.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    }, {// Fetch data immediately
        transform: (data) => {
            return {
                data,
                fetchedAt: Date.now(),
            }
        },
        getCachedData: (key) => {
            const cachedData = nuxt.payload.data[key] || nuxt.static.data[key]
            if (!cachedData) {
                return
            }
            if (Date.now() - cachedData.fetchedAt > 1000 * 60) { // 1 minute cache
                return
            }

            return cachedData
        },
        watch: [sug_limit],
    })

    return { suggestions, sug_limit, more_sugs, addVote, postSuggestion, status, refresh }
}