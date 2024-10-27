import { arrayUnion, updateDoc, doc, getDoc } from 'firebase/firestore' // adjust the imports based on your setup

export async function useFavorites(key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    const user = useCookie('user')
    console.log(user)
    const docRef = doc(db, 'users', user.value.uid)
    // }
    // Use useAsyncData to fetch and cache episodes
    const { data: favorites, refresh } = await useAsyncData(key, async () => {
        // Fetch season document to get the episode IDs
        // Query the episodes based on the episode IDs
        console.log('Fetching favorites')
        const user_data = (await getDoc(docRef)).data()
        const liked_episodes = user_data?.likes
        console.log('liked', liked_episodes)
        const { episodes } = await useEpisodes(liked_episodes, 5, 'desc', 'favs')
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
        },

    })

    return { favorites, refresh }
}
