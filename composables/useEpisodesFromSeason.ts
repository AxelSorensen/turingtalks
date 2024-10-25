import { query, doc, getDoc, getDocs, collection, where, documentId, orderBy } from 'firebase/firestore' // adjust the imports based on your setup

export function useEpisodesFromSeason(season_id: string, order: 'asc' | 'desc', key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    // Use useAsyncData to fetch and cache episodes
    const { data: episodes } = useAsyncData(`episodes-from-season-${season_id}`, async () => {

        // Fetch season document to get the episode IDs
        const epDocRef = doc(db, 'seasons', season_id)
        const ep_ids = await getDoc(epDocRef)
        const ep_ids_ = ep_ids.data()?.episodes
        // Query the episodes based on the episode IDs
        const eps = await getDocs(query(collection(db, 'episodes'), where(documentId(), 'in', ep_ids_), orderBy('date', order)))

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
            console.log('returning cache')
            return cachedData
        }
    })

    return { episodes }
}
