import { query, getDocs, getDoc, doc, collection, where, limit } from 'firebase/firestore';

export async function useCountdown(key: string) {
    const db = useFirestore()
    const nuxt = useNuxtApp()
    const episode_date = (await getDoc(doc(db, 'misc', 'episodes')))?.data()?.new_episode_date
    if (episode_date) {
        //console.log('returning episode')
        return episode_date
    }

}
