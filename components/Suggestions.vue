<template>
    <div class="flex overflow-y-scroll relative w-full gap-4 flex-col">

        <TransitionGroup tag="div" name="fade" class="flex flex-col w-full gap-4">
            <div v-for="topic, id in ordered_topics" :key="topic?.id" :ref="topic?.id">
                <div class="bg-[#ebd9c6] flex text-stone-900 transition-all
                    rounded-md gap-4  p-2 justify-between">
                    <h2 class=" font-medium">{{ topic?.title }}</h2>
                    <div class="flex gap-2 items-center">

                        <p class="whitespace-nowrap">{{ topic?.votes }} votes</p>
                        <button class="text-[#9d7448]"
                            :class="[upvoted?.data?.includes(topic?.id) || topic.just_added ? 'opacity-100 pointer-events-none ' : 'opacity-50 hover:opacity-100']"
                            @click="() => voteUp(id, topic.id)">
                            <ChevronSolid class="text-xl mt-[4px] -rotate-90" />
                        </button>
                    </div>
                </div>
            </div>
        </TransitionGroup>
    </div>





</template>

<script setup>
const user = useCookie('user')
const show_modal = useState('show_modal')
const voteUp = async (idx, id) => {
    if (!user.value) {
        show_modal.value = true
        return
    }
    if (!upvoted.value) {
        return
    }
    ordered_topics.value[idx].votes += 1;
    upvoted.value.data.push(id)
    console.log(id)
    await addVote(id)
    refresh()

}


const props = defineProps({
    items: Array,

})


const { items } = toRefs(props)

const { addVote } = await useSuggestions('suggestion-function')
import ChevronSolid from '~icons/typcn/chevron-right'

const ordered_topics = computed(() => {
    if (!items?.value) {
        return []
    }
    return Object.values(items?.value)?.sort((a, b) => {
        if (b.just_added) {
            return 1
        } else if (a.just_added) {
            return -1
        }

        return b.votes - a.votes;
    });
});


const { upvoted, refresh } = await useUpvoted('upvoted-by-user')




// const addVote = async (id, idx) => {
//     ordered_topics.value[idx].votes += 1;
//     movingItemId.value = id;
//     setTimeout(() => {
//         movingItemId.value = 'None';
//     }, 500);
//     pending_id.value = id
//     const document = doc(db, "suggestions", id)
//     const current_votes = (await getDoc(document)).data().votes
//     await setDoc(document, {
//         votes: current_votes + 1
//     }, { merge: true });
//     pending_id.value = null
// }

const movingItemRef = ref(null);  // Create a ref to hold the element




</script>

<style scoped>
/* Declare transitions */
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all .5s cubic-bezier(0.55, 0, 0.1, 1);

}


/* Define enter and leave animations */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01)
}

/* Fix the leaving item's layout during animation */
.fade-leave-active {
    @apply absolute w-full
}
</style>