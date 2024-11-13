import { query, getDocs, collection, limit, documentId, where, orderBy, Timestamp } from 'firebase/firestore' // adjust the imports based on your setup

export async function usePopularEpisodes(ep_limit: number, order: 'asc' | 'desc', key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    // Use useAsyncData to fetch and cache episodes
    const { data: popular_episodes, refresh } = await useAsyncData(key, async () => {

        const q = query(collection(db, 'episodes'), orderBy('likes', 'desc'), limit(ep_limit))
        // Fetch season document to get the episode IDs
        //console.log('Fetching episodes')

        // Query the episodes based on the episode IDs
        const eps = await getDocs(q)

        // Return the episodes data

        return eps.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(ep =>
            new Date(ep.date.seconds * 1000) <= new Date())

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
        }
    })

    return { popular_episodes, refresh }
}
