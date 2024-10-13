<template>

    <div class="grid max-w-[800px] mx-auto grid-rows-[auto,auto,auto,] h-full grid-cols-1 justify-center items-center">
        <div class="flex flex-col items-center p-4">
            <h1 class="sm:text-5xl text-4xl text-stone-900  font-bold">The Turing Talks</h1>
            <!-- <img class="size-28 text-red-50 absolute mt-[-30px] opacity-5" src="../assets/logo.png" alt=""> -->
            <h2 class="text-lg text-stone-900 ">The first AI-hosted podcast about AI</h2>
            <img class="size-16 mt-4 mb-2" src="../assets/logo.png" alt="">
        </div>
        <Cog />
        <div class="flex px-2 flex-col  items-center">
            <h2 class="sm:text-3xl text-2xl text-stone-900  font-bold">What should we cover next?</h2>
            <PostSuggestion />

        </div>
        <div class="px-4 pt-2">
            <h2 class="pb-2 text-xl text-stone-900 ">Featured talks</h2>
            <SimpleCards :items="episodes" :limit="featured_limit" />
            <div v-if="featured_limit == 2" @click="showMoreTalks"
                class="text-center items-center flex justify-center hover:text-stone-900 cursor-pointer pt-4 text-sm text-stone-500">
                <p>See More</p>
                <ChevronDown class="text-lg mt-[1px]" />
            </div>

            <NuxtLink to="/catalogue" v-else @click="showMoreTalks">
                <div class="text-center hover:text-stone-900  rounded-sm  cursor-pointer pt-4 text-sm text-stone-500">
                    See all episodes
                </div>
            </NuxtLink>
        </div>

        <div class="flex px-4 p-2 justify-start  flex-col">
            <h2 class="pb-2 text-stone-900 text-xl">Suggested topics</h2>
            <TopicList :limit="suggested_limit" />

            <NuxtLink to="/upcoming" @click="showMoreSuggested">
                <div class="text-center hover:text-stone-900 rounded-sm cursor-pointer pt-4 text-sm text-stone-500">
                    See all suggested topics
                </div>
            </NuxtLink>

        </div>


    </div>
</template>

<script setup>
import ChevronDown from '~icons/heroicons/chevron-down-16-solid'
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

const suggested_limit = ref(5)
const featured_limit = ref(2)

</script>

<style lang="scss" scoped></style>