import { query, getDocs, doc, collection, startAfter, limit, orderBy } from 'firebase/firestore' // adjust the imports based on your setup

export function useComments(ep_id: string, key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    const comment_limit = ref(5)
    const more_comments = ref(true)

    // Use useAsyncData to fetch and cache episodes
    const { data: comments } = useAsyncData(key, async () => {

        const q = computed(() => { return query(collection(db, 'episodes', ep_id, 'comments'), limit(comment_limit.value), orderBy('date', 'desc')) })

        const comments = await getDocs(q.value)
        if (comments.docs.length < comment_limit.value) {
            more_comments.value = false
        }


        return comments.docs.map(doc => ({ id: doc.id, ...doc.data() }))

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
        watch: [comment_limit],
    })

    return { comments, comment_limit, more_comments }
}
