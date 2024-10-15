<template>

    <div class="flex h-full flex-col gap-4 text-xs">
        <div class=" gap-4 flex items-center" v-for="comment in ordered_comments">

            <div class="w-8 h-8 aspect-square bg-stone-600 text-white justify-center items-center flex rounded-full">
                {{
                    comment.user[0] }}</div>


            <div class="bg-stone-200 p-4 w-full items-center flex justify-between rounded-md">
                <div>{{ comment.text }}</div>
                <div class="text-xs whitespace-nowrap text-gray-500">{{ timeAgo(comment.date.seconds) }}
                </div>
            </div>
        </div>

    </div>

</template>


<script setup>


const props = defineProps({
    colRef: Object
})

const { colRef } = toRefs(props)

const comments = useCollection(colRef)

// computed comments sort by date they are date object both of them
const ordered_comments = computed(() => {
    return Object.values(comments.value).sort((a, b) => b.date - a.date)
})

</script>

<style lang="scss" scoped></style>