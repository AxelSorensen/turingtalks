import { Timestamp } from 'firebase/firestore';
import { query, getDocs, getDoc, doc, collection, where, limit } from 'firebase/firestore' // adjust the imports based on your setup

export async function useRandomEpisode(key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    const num_episodes = (await getDoc(doc(db, 'misc', 'episodes')))?.data()?.num_episodes

    const random_index = Math.floor(Math.random() * num_episodes) + 1;

    const docRef = query(collection(db, 'episodes'), where('random_id', '==', random_index), where('date', '<=', Timestamp.fromDate(new Date())), limit(1))

    // console.log(docRef)
    // // Query the episodes based on the episode IDs
    const ep = (await getDocs(docRef)).docs[0]
    //console.log('returning episode')
    return ep.id || null
    // Use useAsyncData to fetch and cache episodes
}
