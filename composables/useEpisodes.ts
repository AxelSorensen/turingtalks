import { query, getDocs, collection, limit, documentId, where, orderBy } from 'firebase/firestore' // adjust the imports based on your setup

export function useEpisodes(ep_ids: 'all' | string[], ep_limit: number, order: 'asc' | 'desc', key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    // Use useAsyncData to fetch and cache episodes
    const { data: episodes, refresh } = useAsyncData(key, async () => {

        let q;
        // Fetch season document to get the episode IDs
        //console.log('Fetching episodes')
        if (ep_ids === 'all') {
            q = query(collection(db, 'episodes'), limit(ep_limit), orderBy('date', order))
        } else {
            q = query(collection(db, 'episodes'), where(documentId(), 'in', ep_ids), limit(ep_limit), orderBy('date', order))
        }
        // Query the episodes based on the episode IDs
        const eps = await getDocs(q)

        // Return the episodes data

        return eps.docs.map(doc => ({ id: doc.id, ...doc.data() }))

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

    return { episodes, refresh }
}
