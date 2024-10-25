<template>
    <div>
        <textarea :maxlength="ch_limit" v-model="new_comment"
            class="bg-stone-200 rounded-md resize-none text-xs w-full p-2" rows="4"
            placeholder="Type a comment"></textarea>
        <div class="flex text-sm gap-2 justify-between">
            <div :class="{ 'text-red-500': new_comment.length == ch_limit }" class="text-xs">{{ new_comment.length }} /
                {{ ch_limit }} characters</div>
            <button @click="postComment"
                :class="[new_comment.length ? 'bg-opacity-100 bg-stone-900 hover:bg-stone-700' : 'bg-opacity-50 pointer-events-none']"
                class="bg-stone-700 text-white rounded-sm p-2">Post comment</button>
        </div>

    </div>
    <div class="flex h-full flex-col gap-4 text-xs">
        <Spinner v-if="!comments" />
        <!-- <div class="w-8 h-8 aspect-square bg-stone-200 text-white justify-center items-center flex rounded-full">
            </div>


            <div class="bg-stone-200 p-6 w-full items-center flex justify-between rounded-md">
                <div></div>
                <div class="text-xs whitespace-nowrap text-gray-500">
                </div>
            </div> -->

        <div v-else-if="comments?.data?.length > 0" class="flex flex-col gap-4 mt-4">
            <div class="gap-4 flex items-center" v-for="comment in comments?.data">




                <div v-if="comment?.user"
                    class="bg-stone-200 p-4 w-full items-center flex justify-between rounded-md gap-16">
                    <div class="flex gap-2">
                        <img :src="comment.user.img" v-if="comment.user?.img" class="w-8 h-8  rounded-full" />

                        <div v-else
                            class="w-8 h-8 aspect-square bg-stone-600 text-white justify-center items-center flex rounded-full">
                            {{
                                comment?.user?.name?.[0] || '?' }}</div>
                        <div class="flex  flex-col gap-1">
                            <p class="whitespace-nowrap font-medium text-stone-900 ">Axel Sorensen</p>
                            <p class="sm:text-xs text-stone-700 text-sm">{{ comment?.text }}</p>
                        </div>
                    </div>
                    <div class="text-xs whitespace-nowrap truncate text-stone-700">{{ useTimeAgo(comment.date.seconds *
                        1000) }}
                    </div>


                </div>
            </div>
            <button v-if="more_comments" class="text-stone-700 hover:text-stone-900" @click="viewMoreEpisodes">Show
                more</button>
        </div>
        <div class="flex flex-col gap-2" v-else>
            <p class="text-center mb-32 text-stone-700">No comments yet
            </p>

        </div>

    </div>

</template>


<script setup>
import { useTimeAgo } from '@vueuse/core';
import { addDoc, collection } from 'firebase/firestore';
const props = defineProps({
    ep_id: String,
})

const user = useCurrentUser()

const { ep_id } = toRefs(props)
const new_comment = ref('')
const ch_limit = 300
const db = useFirestore()

const colRef = collection(db, 'episodes', ep_id.value, 'comments')

const { comments, comment_limit, more_comments } = useComments(ep_id.value, `comments-for-episode-${ep_id.value}`)

const viewMoreEpisodes = () => {
    comment_limit.value += 5
}



const postComment = async () => {
    const comment_buffer = new_comment.value
    new_comment.value = ''
    const new_comment_data = { user: { id: user?.value?.uid, img: user?.value?.photoURL || null, name: user.value.displayName }, text: comment_buffer, date: new Date() }
    const optimistic_comment = new_comment_data
    optimistic_comment.date = { seconds: optimistic_comment.date.getTime() / 1000, nanoseconds: 0 }
    // new_comment_data.date = { seconds: new_comment_data.date.getTime() / 1000, nanoseconds: 0 }
    comments.value.data.splice(0, 0, new_comment_data)
    await addDoc(colRef, optimistic_comment);
}



// watch(comments, () => {
//     fetchImages(); // Fetch images when `comments` change
// });

// computed comments sort by date they are date object both of them

</script>

<style lang="scss" scoped></style>