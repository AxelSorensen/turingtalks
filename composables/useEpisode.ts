// composables/useEpisodes.js
import { query, collection, limit, doc, orderBy } from 'firebase/firestore' // adjust the imports based on your setup

export function useEpisode(doc_id: string, key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()

    const { data: episode } = useAsyncData(key, async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000))

        return $fetch('/api/test')
        // console.log('Fetching episode')
        // // wait 3 seconds
        // return useDocument(doc(db, 'episodes', doc_id), { once: true, ssrKey: key })
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

    return { episode }
}