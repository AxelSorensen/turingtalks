// composables/useEpisodes.js
import { query, collection, getDocs, limit } from 'firebase/firestore' // adjust the imports based on your setup


export function useSeasons(ep_limit: number, order: 'asc' | 'desc', key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()

    const { data: seasons } = useAsyncData(key, async () => {
        const q = query(collection(db, 'seasons'), limit(ep_limit))
        const seasons = await getDocs(q)
        return seasons.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }, {
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
        }
    })

    return { seasons }
}