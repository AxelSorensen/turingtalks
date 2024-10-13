<template>

    <div class="flex overflow-y-scroll w-full gap-4 flex-col ">
        <div v-for="topic in ordered_topics.slice(0, limit || ordered_topics.length)">
            <div class="flex rounded-md bg-orange-200 p-2 justify-between">
                <h2>{{ topic.name }}</h2>
                <div class="flex gap-2 items-center">
                    <p>{{ topic.votes }}</p>
                    <button @click="addVote(topic.id)">^</button>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
const props = defineProps({
    limit: Number
})

import { useTimeAgo } from '@vueuse/core';
import { collection, onSnapshot, getDoc, setDoc, doc } from 'firebase/firestore';
const db = useFirestore()
const colRef = collection(db, 'topics')
const topics = useCollection(colRef)
// const topics = ref({})
// onSnapshot(colRef, (snapshot) => {
//     snapshot.forEach(doc => {
//         topics.value[doc.id] = { ...doc.data() }
//     })
// })
const ordered_topics = computed(() => {
    // Return an array of topics sorted by votes and date
    return Object.values(topics.value).sort((a, b) => {
        const now = new Date();
        const aDate = new Date(a.date.seconds * 1000);
        const bDate = new Date(b.date.seconds * 1000);

        if (now - aDate < 1000) {
            return -1;
        } else if (now - bDate < 1000) {
            return 1;
        }

        return b.votes - a.votes;
    });
});

const addVote = async (id) => {
    const document = doc(db, "topics", id)
    const current_votes = (await getDoc(document)).data().votes
    await setDoc(document, {
        votes: current_votes + 1
    }, { merge: true });

}

</script>

<style lang="scss" scoped></style>