// composables/useEpisodes.js
import { query, collection, limit, orderBy } from 'firebase/firestore' // adjust the imports based on your setup

export function useEpisodes(ep_limit: number, order: 'asc' | 'desc', key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()



    const { data: episodes } = useAsyncData(key, async () => {
        console.log('Fetching episodes')
        // wait 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000))

        return $fetch('/api/test')
        // const q = query(collection(db, 'episodes'), limit(ep_limit), orderBy('date', order))
        // return useCollection(q, { once: true, ssrKey: key })
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
            if (Date.now() - cachedData.fetchedAt > 1000 * 60) { // 1 minute cache
                return
            }
            return cachedData
        }
    })

    return { episodes }
}