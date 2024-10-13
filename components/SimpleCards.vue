<template>
    <div class="grid grid-cols-2 auto-rows-fr gap-2">

        <NuxtLink v-if="ordered_items.length > 2" v-for="(item, index) in ordered_items.slice(0, limit || items.length)"
            :key="item.id" :style="{ backgroundColor: colorPalette[index % colorPalette.length] }"
            class="hover:opacity-80 p-4 flex flex-col text-stone-900 justify-between h-28 relative rounded-md flex-grow"
            :to="`catalogue/episodes/${item.id}`">
            <div>
                <h2 class="text-lg line-clamp-2 font-medium leading-6">{{ item.title }}</h2>
            </div>
            <div class="flex -mr-1 -mb-1 text-xs pt-4 items-center text-stone-900 justify-end gap-1">

                <p class="text-sm text-right">{{ item.duration }} minutes</p>
                <Clock class="text-sm" />
            </div>
        </NuxtLink>
        <div v-else v-for="(item, index) in [1, 2]"
            class="h-28 flex justify-center items-center animate-pulse bg-stone-200 rounded-md">

            <Spinner />
        </div>
    </div>
</template>

<script setup>


// Define and import props
const props = defineProps({
    items: Array,
    limit: Number
})

import Clock from '~icons/heroicons/clock-16-solid'

const colorPalette = ['#A3A7FC', '#F1B2D8', '#F6D78B', '#C6D0BC']

const { items } = toRefs(props)

const ordered_items = computed(() => {
    return items.value.sort((a, b) => b?.date?.seconds - a?.date?.seconds)
})

</script>

<style scoped></style>