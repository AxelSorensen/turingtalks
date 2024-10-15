<template>
    <div class="flex overflow-y-scroll w-full gap-4 flex-col">

        <TransitionGroup tag="div" name="fade" class="flex flex-col gap-4">
            <div v-for="topic, id in ordered_topics.slice(0, limit || ordered_topics.length)" :key="topic.id"
                :ref="topic.id === movingItemId ? movingItemRef : null">
                <div :class="[topic.id == movingItemId ? 'bg-[#d7bb9d] font-bold' : 'bg-[#ebd9c6]']" class=" flex text-stone-900 transition-all
                    rounded-md  p-2 justify-between">
                    <h2 class=" font-medium">{{ topic.name }}</h2>
                    <div class="flex gap-2 items-center">
                        <p class="">{{ topic.votes }} votes</p>
                        <button @click="addVote(topic.id, id)">
                            <ChevronUp class="text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup>


const props = defineProps({
    limit: Number
})
import ChevronUp from '~icons/heroicons/chevron-up-16-solid'

import { collection, onSnapshot, getDoc, setDoc, doc } from 'firebase/firestore';
const db = useFirestore()
const colRef = collection(db, 'topics')
const topics = useCollection(colRef)

const pending_id = ref(null)

const ordered_topics = computed(() => {
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

const movingItemId = ref(null)

const addVote = async (id, idx) => {
    ordered_topics.value[idx].votes += 1;
    movingItemId.value = id;
    setTimeout(() => {
        movingItemId.value = null;
    }, 500);
    pending_id.value = id
    const document = doc(db, "topics", id)
    const current_votes = (await getDoc(document)).data().votes
    await setDoc(document, {
        votes: current_votes + 1
    }, { merge: true });
    pending_id.value = null
}

const movingItemRef = ref(null);  // Create a ref to hold the element

const scrollToItem = async () => {
    if (movingItemRef.value) {
        await nextTick();  // Wait for DOM updates (e.g., after reordering)

        // Scroll the element into view with smooth behavior
        movingItemRef.value.scrollIntoView({
            behavior: 'smooth',
            block: 'center',  // Align item to the center of the viewport
        });
    }
};


</script>

<style scoped>
/* Declare transitions */
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);

}


/* Define enter and leave animations */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
}

/* Fix the leaving item's layout during animation */
.fade-leave-active {
    position: absolute;
}
</style>