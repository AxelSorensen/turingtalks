<template>
    <div class="grid w-full grid-cols-3 sm:grid-cols-3 grid-rows-1 auto-rows-fr gap-2">
        <NuxtLink v-if="formatted_items?.length" v-for="(item, index) in formatted_items.slice(0, 3)" :key="item.id"
            :style="{ backgroundColor: other_colors[index % other_colors.length] }"
            class="hover:brightness-105 p-4 flex flex-col text-stone-900 justify-between h-28 relative rounded-md flex-grow"
            :to="{ path: `/episodes/${item.id}`, query: { c: other_colors[index] } }">
            <div v-cloak>
                <h2 class="text-base line-clamp-2 font-medium leading-6">{{ item.title }}</h2>
            </div>
            <div class="flex -mr-1 -mb-1 text-xs pt-4 items-center text-stone-900 justify-end gap-1">
                <p class="text-sm text-right">{{ item.duration.split(':')[0] }} min</p>
                <Clock class="text-sm" />
            </div>
        </NuxtLink>
        <div v-else v-for="item in limit || 3"
            class="h-28 flex justify-center items-center animate-pulse bg-stone-200 rounded-md">
            <Spinner />
        </div>



    </div>
</template>

<script setup>


// Define and import props
const props = defineProps({
    items: Array,
    limit: Number,
    colors: Array,
    title: Boolean,
})

import Clock from '~icons/heroicons/clock-16-solid'

const { items, colors } = toRefs(props)
const route = useRoute()
const other_colors = computed(() => {
    return colors.value.filter(color => color !== route.query.c)
})

// only return the items that don't had id same as query params
const formatted_items = computed(() => {
    return items.value?.filter(item => item.id !== route.params.id)
})



</script>

<style scoped></style>