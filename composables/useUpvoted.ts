import { query, getDocs, updateDoc, arrayUnion, doc, getDoc, setDoc, addDoc, collection, limit, documentId, where, orderBy } from 'firebase/firestore' // adjust the imports based on your setup

export async function useUpvoted(user_id: string, key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    const user = useCookie('user')
    if (!user.value) {
        return {
            upvoted: undefined, refresh: () => { }
        }
    }
    // Use useAsyncData to fetch and cache episodes
    const { data: upvoted, refresh } = await useAsyncData(key, async () => {

        // Fetch season document to get the episode IDs
        const userRef = doc(db, "users", user?.value?.uid)
        const voted = (await getDoc(userRef)).data().upvoted;
        return voted
        // Return the episodes data

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
            console.log('returning cache')
            return cachedData
        },
    })

    watch(user, (newVal, oldVal) => {
        if (newVal !== oldVal) {
            console.log('User cookie changed, refetching data')
            refresh()  // This will trigger the useAsyncData to refetch data
        }
    })

    return { upvoted }
}
