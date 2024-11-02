<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <NuxtLink v-if="items?.length" v-for="(item, index) in items.slice(0, limit || items?.length)" :key="item.id"
            class="hover:brightness-105 p-4 text-white overflow-hidden relative rounded-md h-[11rem] grid grid-rows-[1fr,auto]"
            :to="{ path: `${path || '/episodes'}/${item.id}`, query: { c: colors[index % colors?.length] } }">

            <img class="object-cover -z-10 brightness-[80%]  absolute w-full" src="/assets/card_img_1.jpeg" alt="">
            <div :class="[item.duration ? 'justify-between text-lg leading-6' : 'justify-center text-center items-center opacity-60 text-2xl']"
                class="flex items-start gap-4">
                <h2 class=" line-clamp-2 font-medium">{{ item.title }}</h2>

                <div v-if="item.duration" class="flex text-white text-sm items-center text-stone-900 gap-1">
                    <p class="whitespace-nowrap text-right">{{ item?.duration?.split(':')[0] }}
                        min</p>
                    <Clock class="text-sm" />
                </div>
            </div>
            <p v-html="item.description" class="break-words text-sm pt-2 line-clamp-4"></p>


        </NuxtLink>
        <NuxtLink v-if="items?.length" v-for="(item, index) in items.slice(0, limit || items?.length)" :key="item.id"
            class="hover:brightness-105 p-4 text-white overflow-hidden relative rounded-md h-[11rem] grid grid-rows-[1fr,auto]"
            :to="{ path: `${path || '/episodes'}/${item.id}`, query: { c: colors[index % colors?.length] } }">

            <img class="object-cover -z-10 brightness-[80%]  absolute w-full" src="/assets/card_img_2.jpeg" alt="">
            <div :class="[item.duration ? 'justify-between text-lg leading-6' : 'justify-center text-center items-center opacity-60 text-2xl']"
                class="flex items-start gap-4">
                <h2 class=" line-clamp-2 font-medium">{{ item.title }}</h2>

                <div v-if="item.duration" class="flex text-white text-sm items-center text-stone-900 gap-1">
                    <p class="whitespace-nowrap text-right">{{ item?.duration?.split(':')[0] }}
                        min</p>
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
    path: String,
    title: Boolean,
})


const { items } = toRefs(props)
const imgs = ref(['/assets/Designer.jpeg', '/assets/Another.jpeg'])



</script>

<style scoped></style>