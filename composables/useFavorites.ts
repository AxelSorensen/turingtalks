import { query, doc, getDoc, collection, getDocs, where, documentId } from 'firebase/firestore' // adjust the imports based on your setup

export function useFavorites(key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    const user = useCookie('user')
    if (!user.value) {
        return { favorites: [], refresh: () => { } }
    }
    const docRef = doc(db, 'users', user?.value?.uid)
    // }
    // Use useAsyncData to fetch and cache episodes
    const { data: favorites, refresh } = useAsyncData(key, async () => {
        // Fetch season document to get the episode IDs
        // Query the episodes based on the episode IDs
        //console.log('Fetching favorites')
        const user_data = (await getDoc(docRef)).data()
        const liked_episodes = user_data?.likes
        const q = query(collection(db, 'episodes'), where(documentId(), 'in', liked_episodes))
        const episodes = await getDocs(q)

        return episodes.docs.map(doc => ({ id: doc.id, ...doc.data() }))

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
            //console.log('returning cache')
            return cachedData
        },

    })
    watch(user, (newVal, oldVal) => {
        //console.log('User cookie changed, refetching data')
        refresh()  // This will trigger the useAsyncData to refetch data
    }, { immediate: true })

    return { favorites, refresh }
}
