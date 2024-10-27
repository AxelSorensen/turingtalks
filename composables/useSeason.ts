import { query, doc, getDoc, getDocs, collection, where, documentId, orderBy } from 'firebase/firestore' // adjust the imports based on your setup

export function useSeason(season_id: string, key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    // Use useAsyncData to fetch and cache episodes
    const { data: season } = useAsyncData(key, async () => {

        // Fetch season document to get the episode IDs
        const seasonRef = doc(db, 'seasons', season_id)
        const season = await getDoc(seasonRef)
        return season.data()

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

    return { season }
}
