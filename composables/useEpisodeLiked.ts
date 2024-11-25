import { arrayUnion, arrayRemove, updateDoc, doc, getDoc, increment } from 'firebase/firestore' // adjust the imports based on your setup

export async function useEpisodeLiked(ep_id: string, key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    const user = useCookie('user')



    const likeEpisode = async () => {


        const user_ref = doc(db, 'users', user?.value?.uid)
        const docRef = doc(db, 'episodes', ep_id)
        await updateDoc(user_ref, {
            likes: arrayUnion(ep_id)
        }, { merge: true })

        await updateDoc(docRef, {
            likes: increment(1)
        }, { merge: true })
        //console.log('liking episode')
    }

    const unlikeEpisode = async () => {

        const user_ref = doc(db, 'users', user?.value?.uid)
        const docRef = doc(db, 'episodes', ep_id)
        await updateDoc(user_ref, {
            likes: arrayRemove(ep_id)
        }, { merge: true })

        await updateDoc(docRef, {
            likes: increment(-1)
        }, { merge: true })
        //console.log('unliking episode')
    }

    // }
    // Use useAsyncData to fetch and cache episodes
    const { data: isLiked, refresh } = await useAsyncData(key, async () => {
        if (!user.value) {
            return
        }

        const docRef = doc(db, 'users', user?.value?.uid)
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
            //console.log('returning cache')
            return cachedData
        }
    })

    watch(user, (newVal, oldVal) => {
        //console.log('User cookie changed, refetching data')
        refresh()  // This will trigger the useAsyncData to refetch data
    }, { immediate: true })

    return { isLiked, likeEpisode, unlikeEpisode, refresh }
}
