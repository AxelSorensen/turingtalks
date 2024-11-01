import { query, getDocs, doc, collection, startAfter, limit, orderBy } from 'firebase/firestore' // adjust the imports based on your setup

export function useComments(ep_id: string, key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    const comment_limit = ref(5)
    const more_comments = ref(true)
    const lastVisible = ref(null)
    const allComments = ref([])
    // Use useAsyncData to fetch and cache episodes
    const { data: comments, status, refresh } = useAsyncData(key, async () => {

        let q;
        if (lastVisible.value === null) {
            q = query(collection(db, 'episodes', ep_id, 'comments'), orderBy('date', 'desc'), limit(comment_limit.value))
        }
        else {
            q = query(collection(db, 'episodes', ep_id, 'comments'), orderBy('date', 'desc'), startAfter(lastVisible.value), limit(comment_limit.value))
        }
        const comments = await getDocs(q)

        allComments.value.push(...comments.docs)

        lastVisible.value = comments.docs[comments.docs.length - 1]

        if (comments.docs.length < comment_limit.value) {
            more_comments.value = false
        }
        return allComments.value.map(doc => ({ id: doc.id, ...doc.data() }))

    }, {// Fetch data immediately

        transform: (data) => {
            return {
                data,
                fetchedAt: Date.now(),
            }
        },




    })

    return { comments, comment_limit, more_comments, status, refresh }
}
