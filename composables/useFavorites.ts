import { arrayUnion, updateDoc, doc, getDoc } from 'firebase/firestore' // adjust the imports based on your setup

export async function useFavorites(user_id: string, key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()

    const docRef = doc(db, 'users', user_id)
    // }
    // Use useAsyncData to fetch and cache episodes
    const { data: favorites, } = await useAsyncData(key, async () => {
        // Fetch season document to get the episode IDs
        // Query the episodes based on the episode IDs

        const user_likes = await getDoc(docRef)
        const ep_ids = user_likes.data().likes

        const { episodes } = await useEpisodes(ep_ids, 4, 'desc', 'latest_episodes')
        return episodes.value.data

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

    return { favorites }
}
