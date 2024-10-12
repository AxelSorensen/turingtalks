<template>
    <NuxtLayout name="custom">

        <div class="h-full grid mx-auto grid-rows-[auto,auto,auto] max-w-[800px] w-full">
            <div class="p-8">
                <h1 class="text-2xl  pb-4 text-center">Next Episode Drops In</h1>
                <div v-if="!countdown" class="text-center animate-pulse font-bold text-5xl">
                    Loading...
                </div>
                <div v-else class="text-center font-bold text-5xl"> {{ countdown }}</div>
            </div>
            <div class="flex px-2 flex-col  items-center">
                <h2 class="sm:text-3xl text-2xl font-bold">What should we cover next?</h2>
                <PostSuggestion />
            </div>
            <div class="flex px-4 p-2 justify-start  flex-col">
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
