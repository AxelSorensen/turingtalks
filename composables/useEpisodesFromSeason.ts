// composables/useEpisodes.js
import { query, doc, collection, limit, orderBy, where, documentId } from 'firebase/firestore' // adjust the imports based on your setup

export async function useEpisodesFromSeason(seasonId: string, ep_limit: number, order: 'asc' | 'desc', key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    const { data: episodes } = useAsyncData(key, async () => {
        const seasonDocRef = doc(db, 'seasons', seasonId)

        const season_episodes = useDocument(seasonDocRef, { once: true })

        const q = query(collection(db, 'episodes'), where(documentId(), 'in', season_episodes?.value?.episodes), limit(ep_limit), orderBy('date', order))
        return useCollection(q, { once: true, ssrKey: key })
    }, {

        transform: (data) => {
            return {
                data,
                fetchedAt: Date.now(),
            }
        },
        getCachedData: (key) => {
            const cachedData = nuxt.payload.data[key] || nuxt.static.data[key] || null
            if (!cachedData) {
                return
            }
            if (Date.now() - cachedData.fetchedAt > 1000 * 1) { // 1 minute cache
                return
            }
            return cachedData
        }

    })

    return { episodes }
}