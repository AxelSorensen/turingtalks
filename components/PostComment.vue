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
</template>

<script setup>
import { addDoc } from 'firebase/firestore';
const new_comment = ref('')

const props = defineProps({
    colRef: Object
})

const ch_limit = 300



const { colRef } = toRefs(props)



const postComment = async () => {
    let comment_buffer = new_comment.value
    new_comment.value = ''
    await addDoc(colRef.value, { user: 'Anonymous', text: comment_buffer, date: new Date() });

}
</script>

<style lang="scss" scoped></style>