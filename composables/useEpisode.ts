import { query, getDoc, doc, } from 'firebase/firestore' // adjust the imports based on your setup

export async function useEpisode(ep_id: string, key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    // Use useAsyncData to fetch and cache episodes
    const { data: episode } = await useAsyncData(key, async () => {

        // Fetch season document to get the episode IDs
        //console.log('Fetching episodes')
        const docRef = doc(db, 'episodes', ep_id)
        // Query the episodes based on the episode IDs
        const ep = await getDoc(docRef)
        if (ep.exists()) {
            //console.log('returning episode')
            return { id: ep.id, ...ep.data() }
        }
        // Return the episodes data

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
            //console.log('returning episode from cache')
            return cachedData
        }
    })

    return { episode }
}
