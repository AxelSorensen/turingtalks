import { arrayUnion, updateDoc, doc, getDoc } from 'firebase/firestore' // adjust the imports based on your setup

export async function useFavorites(user_id: string, key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()

    const docRef = doc(db, 'users', user_id)
    console.log('user', user_id)
    // }
    // Use useAsyncData to fetch and cache episodes
    const { data: favorites, } = await useAsyncData(key, async () => {
        // Fetch season document to get the episode IDs
        // Query the episodes based on the episode IDs

        const user = await getDoc(docRef)

        let ep_ids;
        if (user.exists()) {
            const data = user.data()
            ep_ids = data.likes

        }
        const { episodes } = await useEpisodes(ep_ids, 4, 'desc', 'latest_episodes')
        console.log(episodes)
        return episodes



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
