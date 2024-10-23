// composables/useEpisodes.js
import { query, doc, collection, limit, orderBy, where, documentId } from 'firebase/firestore' // adjust the imports based on your setup

export async function useSeasonEpisodes(season_episodes: any, ep_limit: number, order: 'asc' | 'desc', key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    const { data: episodes } = await useAsyncData(key, async () => {

        // season_episodes is undefined on the first page load and therefore the query below doesn't work

        const q = query(collection(db, 'episodes'), where(documentId(), 'in', season_episodes.value.data.episodes), limit(ep_limit), orderBy('date', order))
        return useDocument(q, { once: true, ssrKey: key })

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
            // if (Date.now() - cachedData.fetchedAt > 1000 * ) { // 1 minute cache
            //     return
            // }
            return cachedData
        },
        watch: [season_episodes]

    })

    return { episodes }
}