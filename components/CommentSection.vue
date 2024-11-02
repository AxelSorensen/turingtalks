<template>
    <div>
        <div class="mb-2 text-sm font-medium">Join the discussion</div>
        <textarea :maxlength="ch_limit" v-model="new_comment"
            class="bg-stone-200 outline-stone-700 rounded-md resize-none text-xs w-full p-2" rows="4"
            placeholder="Type a comment"></textarea>
        <div class="flex text-sm gap-2 justify-between">
            <div :class="{ 'text-red-500': new_comment.length == ch_limit }" class="text-xs">{{ new_comment.length }} /
                {{ ch_limit }} characters</div>
            <button @click="postComment"
                :class="[new_comment.length ? 'bg-opacity-100 bg-stone-900 hover:bg-stone-700' : 'bg-opacity-50 pointer-events-none', post_error ? 'animate-shake' : '']"
                class="bg-stone-700 text-white rounded-sm p-2">Post comment</button>
        </div>

    </div>
    <div class="mt-4 font-medium">Comments</div>
    <div class="flex h-full flex-col gap-4 text-xs">
        <Spinner class="mx-auto" v-if="!comments" />
        <!-- <div class="w-8 h-8 aspect-square bg-stone-200 text-white justify-center items-center flex rounded-full">
            </div>


            <div class="bg-stone-200 p-6 w-full items-center flex justify-between rounded-md">
                <div></div>
                <div class="text-xs whitespace-nowrap text-gray-500">
                </div>
            </div> -->

        <div v-else-if="comments?.data?.length > 0" class="flex flex-col gap-4 mt-2">
            <div class="gap-4 relative flex items-center" v-for="comment in comments?.data">




                <div v-if="comment?.user"
                    class="bg-stone-200 p-4 w-full items-center flex justify-between rounded-md gap-16">
                    <div class="flex gap-2">
                        <img :src="comment.user.img" v-if="comment.user?.img" class="w-8 h-8  rounded-full" />

                        <div v-else
                            class="w-8 h-8 aspect-square bg-stone-900 text-white justify-center items-center flex rounded-full">
                            {{
                                comment?.user?.name?.[0] || '?' }}</div>
                        <div class="flex  flex-col gap-1">
                            <p class="whitespace-nowrap font-medium text-stone-900 ">{{ comment?.user.name }}</p>
                            <p class="sm:text-xs text-stone-700 mt-1 text-sm">{{ comment?.text }}</p>
                        </div>
                    </div>
                    <div class="text-xs absolute top-4 right-4 whitespace-nowrap text-stone-700">{{
                        useTimeAgo(comment.date.seconds *
                            1000) }}
                    </div>


                </div>
            </div>
            <div class="h-10 -mt-2 flex justify-center items-center">
                <Spinner class="scale-[60%]" v-if="status == 'pending'" />
                <button v-else-if="more_comments && comments?.data?.length >= 5"
                    class="text-stone-700 text-sm hover:text-stone-900" @click="viewMoreEpisodes">Show
                    more</button>
            </div>
        </div>
        <div class="flex flex-col mt-8  gap-2" v-else>
            <p class="text-center text-sm mb-12 text-stone-400">No comments yet
            </p>

        </div>

    </div>

</template>


<script setup>
import { useTimeAgo } from '@vueuse/core';
import { addDoc, collection, doc, increment, setDoc, updateDoc } from 'firebase/firestore';
const props = defineProps({
    ep_id: String,
})

const user = useCookie('user')

const { ep_id } = toRefs(props)
const new_comment = ref('')
const ch_limit = 300
const db = useFirestore()

const colRef = collection(db, 'episodes', ep_id.value, 'comments')

const { comments, comment_limit, more_comments, status, refresh } = useComments(ep_id.value, `comments-for-episode-${ep_id.value}`)

const viewMoreEpisodes = () => {
    refresh()
}

const { $setToast } = useNuxtApp()

const show_login_modal = useState('show_login_modal')
const post_error = ref(false)
const postComment = async () => {
    if (!user.value) {
        show_login_modal.value = true
        return
    }
    const comments_per_x = 5
    const expiration = 60 * 60 * 1000
    const date_commented = new Date().getTime() / 1000
    const docRef = doc(db, 'users', user?.value?.uid)
    if (!user.value.last_commented?.seconds || (new Date() - new Date(user.value.last_commented?.seconds * 1000) > new Date(expiration))) {
        setDoc(docRef, { last_commented: new Date(date_commented * 1000) }, { merge: true })
        user.value.last_commented = { seconds: date_commented, nanoseconds: 0 }
    }
    const last_commented = new Date().getTime() - new Date(user.value.last_commented.seconds * 1000).getTime()
    const remaining_time = expiration - last_commented
    //console.log(remaining_time)
    // Check if user has commented in the last 1 minute
    if (remaining_time > 0 && user.value.comments_today >= comments_per_x) {
        post_error.value = true
        setTimeout(() => {
            post_error.value = false
        }, 1000)

        // Calculate the remaining time until the user can comment again

        const minutes = Math.floor(remaining_time / 60000)
        $setToast({ title: 'Comment limit', text: `You can only submit ${comments_per_x} comments per hour. Try again in ${minutes} minutes.` })
        return
    }

    const comment_buffer = new_comment.value
    new_comment.value = ''
    const new_comment_data = { user: { id: user?.value?.uid, img: user?.value?.img || null, name: user?.value?.username }, text: comment_buffer, date: new Date() }
    const optimistic_comment = new_comment_data
    optimistic_comment.date = { seconds: optimistic_comment.date.getTime() / 1000, nanoseconds: 0 }
    comments.value?.data?.splice(0, 0, new_comment_data)
    await addDoc(colRef, optimistic_comment);

    updateDoc(docRef, { comments_today: increment(1) }, { merge: true })
    user.value.comments_today = user.value.comments_today + 1 || 1
}



// watch(comments, () => {
//     fetchImages(); // Fetch images when `comments` change
// });

// computed comments sort by date they are date object both of them

</script>

<style lang="scss" scoped></style>