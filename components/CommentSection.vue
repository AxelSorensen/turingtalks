<template>
    <div class="flex h-full flex-col gap-4 text-xs">

        <Spinner v-if="!comments.length" />
        <!-- <div class="w-8 h-8 aspect-square bg-stone-200 text-white justify-center items-center flex rounded-full">
            </div>


            <div class="bg-stone-200 p-6 w-full items-center flex justify-between rounded-md">
                <div></div>
                <div class="text-xs whitespace-nowrap text-gray-500">
                </div>
            </div> -->

        <div v-else-if="ordered_comments.length > 0" class="flex flex-col gap-4 mt-4">
            <div class="gap-4 flex items-center" v-for="comment in ordered_comments">




                <div v-if="comment?.user"
                    class="bg-stone-200 p-4 w-full items-center flex justify-between rounded-md gap-16">
                    <div class="flex gap-2">
                        <img :src="userImages[comment.user.id]" v-if="comment.user?.img"
                            class="w-8 h-8  rounded-full" />

                        <div v-else
                            class="w-8 h-8 aspect-square bg-stone-600 text-white justify-center items-center flex rounded-full">
                            {{
                                comment?.user?.name?.[0] || '?' }}</div>
                        <div class="flex  flex-col gap-1">
                            <p class="whitespace-nowrap font-medium text-stone-900 ">Axel Sorensen</p>
                            <p class="sm:text-xs text-stone-700 text-sm">{{ comment?.text }}</p>
                        </div>
                    </div>
                    <div class="text-xs whitespace-nowrap text-stone-500">{{ timeAgo(comment?.date?.seconds) }}
                    </div>

                </div>
            </div>
        </div>
        <div class="flex flex-col gap-2" v-else>
            <p class="text-center mb-32 text-stone-400">No comments yet
            </p>

        </div>

    </div>

</template>


<script setup>
import { collection, doc, query, where, collectionGroup } from 'firebase/firestore';

const db = useFirestore()

const props = defineProps({
    colRef: Object
})

const { colRef } = toRefs(props)

const comments = useCollection(colRef, { once: true })

// Execute the query and handle the results with .then()


const userImages = ref({})

const fetchImages = async () => {

    comments.value?.forEach(comment => {
        if (comment?.user?.id) {
            if (comment.user.id in userImages.value)
                return
            // get firebase image from users
            let buffer = useDocument(doc(db, 'users', comment.user.id), { once: true })
            userImages.value[comment.user.id] = buffer.value?.img
        }
    })
}

watch(comments, () => {
    fetchImages(); // Fetch images when `comments` change
});

// computed comments sort by date they are date object both of them
const ordered_comments = computed(() => {
    return Object.values(comments?.value)
        .filter(comment => comment?.user)
        .sort((a, b) => b?.date - a?.date)
})

</script>

<style lang="scss" scoped></style>