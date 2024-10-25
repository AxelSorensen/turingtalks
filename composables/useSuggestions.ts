import { query, getDocs, collection, limit, documentId, where, orderBy } from 'firebase/firestore' // adjust the imports based on your setup

export function useSuggestions(sug_limit: number, order: 'asc' | 'desc', key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    // Use useAsyncData to fetch and cache episodes
    const { data: suggestions } = useAsyncData(key, async () => {

        // Fetch season document to get the episode IDs
        console.log('Fetching suggestions')

        const q = query(collection(db, 'suggestions'), limit(sug_limit), orderBy('votes', order))
        const sugs = await getDocs(q)


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
            console.log('returning cache')
            return cachedData
        }
    })

    return { suggestions }
}
