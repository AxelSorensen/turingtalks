<template>
    <NuxtLayout name="custom">

        <div class="h-full w-full text-stone-900 grid mx-auto grid-rows-[auto,auto,auto]">
            <div class="p-8">
                <h1 class="text-2xl  pb-4 text-center">Next Episode Drops In</h1>
                <div v-if="!countdown" class="text-center animate-pulse font-bold text-4xl">
                    Loading...
                </div>
                <div v-else class="text-center font-bold text-4xl"> {{ countdown }}</div>
            </div>
            <div class="flex flex-col  items-center">
                <h2 class="sm:text-3xl text-2xl font-bold">What should we cover next?</h2>
                <PostSuggestion />
            </div>
            <div class="flex justify-start  flex-col">
                <h2 class="pb-2 text-xl">Suggested topics</h2>
                <TopicList />


            </div>

        </div>
    </NuxtLayout>
</template>

<script setup>

import { collection, count } from 'firebase/firestore';
const countdown = ref(null)
// set interval and call every second the timeuntil function



const db = useFirestore()
const colRef = collection(db, 'episodes')
const episodes = useCollection(colRef)
// 5 fake episodes with name, description, and id and 10

onMounted(() => {
    let now = new Date();
    now.setHours(now.getHours() + 1);
    setInterval(() => {

        countdown.value = timeUntil(now);
    }, 1000)
})

</script>


<style lang=" scss" scoped>
                        </style>
