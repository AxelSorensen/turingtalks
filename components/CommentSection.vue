<template>

    <div class="flex h-full flex-col gap-2 text-xs">
        <div class="p-2 gap-4 flex items-center" v-for="comment in ordered_comments">

            <div class="w-8 h-8 aspect-square bg-red-500 text-white justify-center items-center flex rounded-full">
                {{
                    comment.user[0] }}</div>


            <div class="bg-gray-100 p-4 w-full items-center flex justify-between rounded-sm">
                <div>{{ comment.text }}</div>
                <div class="text-xs whitespace-nowrap text-gray-500">{{ timeAgo(comment.date.seconds) }}</div>
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