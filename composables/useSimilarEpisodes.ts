import { query, getDocs, where, limit, collection } from 'firebase/firestore' // adjust the imports based on your setup

export function useSimilarEpisodes(ep_limit: number, order: 'asc' | 'desc', key: string, ep_id: string, tags_array: string[]) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    // Use useAsyncData to fetch and cache episodes
    const { data: similar_episodes } = useAsyncData(key, async () => {
        // Fetch season document to get the episode IDs
        //console.log('Fetching episodes')
        // Query the episodes based on the episode IDs + 1 so we can filter out the current episode
        const eps = await getDocs(query(collection(db, 'episodes'), where('tags', 'array-contains-any', tags_array), limit(ep_limit + 1)))
        let other_eps = [];
        let episodes = eps.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(ep => ep.id !== ep_id && new Date(ep.date) <= new Date())

        // If no episodes are found, fetch 3 random episodes
        if (episodes.length < 3) {
            const randomEps = await getDocs(query(collection(db, 'episodes'), limit(3 - episodes.length + 1)))
            other_eps = randomEps.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        }
        // Combine episodes and other_eps
        return [...episodes, ...other_eps]

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
            //console.log('returning similar eps from cache')
            return cachedData
        },

    })

    return { similar_episodes }
}
