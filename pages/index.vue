<template>

    <div class="grid max-w-[800px] mx-auto grid-rows-[auto,auto,auto,] h-full grid-cols-1 justify-center items-center">
        <div class="flex flex-col items-center p-8">
            <h1 class="sm:text-5xl text-4xl font-bold">The Turing Talks</h1>
            <h2 class="text-lg">The first AI-hosted podcast about AI</h2>
        </div>
        <Cog />
        <div class="flex px-2 flex-col  items-center">
            <h2 class="sm:text-3xl text-2xl font-bold">What should we cover next?</h2>
            <PostSuggestion />
        </div>
        <div class="px-4 pt-2">
            <h2 class="pb-2 text-xl text-[#572D29]">Featured talks</h2>
            <Cards :items="episodes" :limit="featured_limit" />
            <div v-if="featured_limit == 2" @click="showMoreTalks"
                class="text-center hover:text-black cursor-pointer pt-2 text-sm text-[#572D29]">
                See more
            </div>
            <NuxtLink to="/catalogue" v-else @click="showMoreSuggested">
                <div
                    class="text-center hover:text-black  rounded-sm  p-2 mt-2 cursor-pointer pt-2 text-sm text-[#572D29]">
                    See all episodes
                </div>
            </NuxtLink>
        </div>

        <div class="flex px-4 p-2 justify-start  flex-col">
            <h2 class="pb-2 text-[#572D29] text-xl">Suggested topics</h2>
            <TopicList :limit="suggested_limit" />
            <div v-if="suggested_limit == 3" @click="showMoreSuggested"
                class="text-center hover:text-black cursor-pointer pt-2 text-sm text-[#572D29]">
                See more
            </div>
            <NuxtLink to="/upcoming" v-else @click="showMoreSuggested">
                <div
                    class="text-center hover:text-black rounded-sm  p-2 mt-2 cursor-pointer pt-2 text-sm text-[#572D29]">
                    See all suggested topics
                </div>
            </NuxtLink>

        </div>


    </div>
</template>

<script setup>

import { collection } from 'firebase/firestore';


const db = useFirestore()
const colRef = collection(db, 'episodes')
const episodes = useCollection(colRef)
// const topics = ref([{ name: 'About superposition', votes: 10 }])
// come up with featured episodes 3 of them


const showMoreTalks = () => {
    featured_limit.value = 8
}


const showMoreSuggested = () => {
    suggested_limit.value = 6
}

const suggested_limit = ref(3)
const featured_limit = ref(2)

</script>

<style lang="scss" scoped></style>