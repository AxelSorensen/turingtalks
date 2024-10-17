<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <NuxtLink v-if="ordered_items.length > 0" v-for="(item, index) in ordered_items.slice(0, limit || items.length)"
            :key="item.id" :style="{ backgroundColor: colors[index % colors.length] }"
            class="hover:brightness-105 p-4 rounded-md h-[11rem] grid grid-rows-[1fr,auto]"
            :to="{ path: `${path || '/episodes'}/${item.id}`, query: { color: colors[index % colors.length] } }">
            <div :class="[item.duration ? 'justify-between text-lg leading-6' : 'justify-center text-center items-center opacity-60 text-2xl']"
                class="flex items-start gap-4">
                <h2 class=" line-clamp-2 font-medium">{{ item.title }}</h2>

                <div v-if="item.duration" class="flex text-sm items-center text-stone-900 gap-1">
                    <!-- <p class="text-sm text-black text-opacity-40">Published {{ new Date(item?.date?.seconds *
                        1000).toLocaleDateString('en-GB', {
                            day: '2-digit', month: 'short', year: 'numeric'
                        }).replace(',', '') }}</p>- -->
                    <p class="whitespace-nowrap text-right">{{ item?.duration?.split(':')[0] }}
                        minutes</p>
                    <Clock class="text-sm" />
                </div>
            </div>
            <p v-html="item.description" class="break-words text-sm pt-2 line-clamp-4"></p>

        </NuxtLink>

        <div v-else v-for="i in limit || 10"
            class="h-[12rem] flex justify-center items-center animate-pulse bg-stone-200 rounded-md">

            <Spinner />
        </div>
    </div>
</template>

<script setup>

import Clock from '~icons/heroicons/clock-16-solid'
// Define and import props
const props = defineProps({
    items: Array,
    limit: Number,
    colors: Array,
    path: String
})

const { items } = toRefs(props)

const ordered_items = computed(() => {
    return items.value.sort((a, b) => b?.date?.seconds - a?.date?.seconds)
})

</script>

<style scoped></style>