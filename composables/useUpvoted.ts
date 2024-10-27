import { query, getDocs, updateDoc, arrayUnion, doc, getDoc, setDoc, addDoc, collection, limit, documentId, where, orderBy } from 'firebase/firestore' // adjust the imports based on your setup

export async function useUpvoted(key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    const user = useCookie('user')
    // Use useAsyncData to fetch and cache episodes
    const { data: upvoted, refresh } = await useAsyncData(key, async () => {
        if (!user.value) {
            return
        }

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
        refresh()  // This will trigger the useAsyncData to refetch data
    }, { immediate: true })

    return { upvoted, refresh }
}
