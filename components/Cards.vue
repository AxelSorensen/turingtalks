<template>
    <div class="grid grid-cols-2 gap-2">

        <NuxtLink v-if="ordered_items.length > 2" v-for="(item, index) in ordered_items.slice(0, limit || items.length)"
            :key="item.id" :style="{ backgroundColor: colorPalette[index % colorPalette.length] }"
            class="hover:opacity-80 p-4 rounded-md flex-grow" :to="`catalogue/episodes/${item.id}`">
            <h2 class="text-lg truncate font-medium leading-6">{{ item.title }}</h2>
            <p class="text-sm pb-2 text-black text-opacity-40">{{ new Date(item?.date?.seconds *
                1000).toLocaleDateString('en-GB', {
                    day: '2-digit', month: 'short', year: 'numeric'
                }).replace(',', '') }}</p>
            <p v-html="item.description" class="break-all text-sm line-clamp-4"></p>
        </NuxtLink>
        <div v-else v-for="(item, index) in [1, 2]"
            class="h-[164px] flex justify-center items-center animate-pulse bg-stone-200 rounded-md">

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

const colorPalette = ['#A3A7FC', '#F1B2D8', '#F6D78B', '#C6D0BC']

const { items } = toRefs(props)

const ordered_items = computed(() => {
    return items.value.sort((a, b) => b?.date?.seconds - a?.date?.seconds)
})

</script>

<style scoped></style>