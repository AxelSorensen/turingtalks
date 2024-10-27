import { arrayUnion, arrayRemove, updateDoc, doc, getDoc } from 'firebase/firestore' // adjust the imports based on your setup

export async function useEpisodeLiked(ep_id: string, user_id: string, key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()

    const docRef = doc(db, 'users', user_id)

    const likeEpisode = async () => {
        await updateDoc(docRef, {
            likes: arrayUnion(ep_id)
        }, { merge: true })
        console.log('liking episode')
    }

    const unlikeEpisode = async () => {
        await updateDoc(docRef, {
            likes: arrayRemove(ep_id)
        }, { merge: true })
        console.log('unliking episode')
    }

    // }
    // Use useAsyncData to fetch and cache episodes
    const { data: isLiked, refresh } = await useAsyncData(key, async () => {
        // Fetch season document to get the episode IDs
        // Query the episodes based on the episode IDs
        let ep_liked;
        const ep = await getDoc(docRef)
        if (ep.exists()) {
            ep_liked = ep.data()

        }
        return ep_liked.likes.includes(ep_id)



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

    return { isLiked, likeEpisode, unlikeEpisode, refresh }
}
