<template>

    <div class="grid relative mx-auto grid-rows-[auto,auto,auto,] h-full grid-cols-1 justify-center items-center">
        <div class="flex  flex-col items-center p-4">
            <h1 class="sm:text-5xl text-4xl text-stone-900  font-bold">The Turing Talks</h1>
            <!-- <img class="size-28 text-red-50 absolute mt-[-30px] opacity-5" src="../assets/logo.png" alt=""> -->
            <h2 class="text-lg text-stone-900 ">The first AI-hosted podcast about AI</h2>
            <img class="size-16 mt-4 mb-2" src="~/assets/logo.png" alt="">
        </div>

        <div class="flex  px-4 pb-2 flex-col  items-center">
            <h2 class="sm:text-3xl text-2xl text-stone-900 mb-4 font-bold">What should we cover next?</h2>
            <PostSuggestion />

        </div>
        <div class="px-4 max-w-[800px] w-full mx-auto pt-2">
            <h2 class="pb-2 text-xl text-stone-900 ">Latest episodes</h2>
            <SimpleCards :items="episodes" :colors="colors" :limit="featured_limit" />
            <!-- <div v-if="featured_limit == 2" @click="showMoreTalks"
                class="text-center items-center flex justify-center hover:text-stone-900 cursor-pointer pt-4 text-sm text-stone-700">
                <p>See More</p>
                <ChevronDown class="text-lg mt-[1px]" />
            </div> -->

            <NuxtLink to="/episodes">
                <div
                    class="text-center transition-all w-fit mx-auto hover:text-stone-900  rounded-sm  cursor-pointer mt-4 text-sm text-stone-400">
                    See all episodes
                </div>
            </NuxtLink>
        </div>

        <div class="flex max-w-[800px] w-full mx-auto px-4 p-2 pb-8 justify-start  flex-col">
            <h2 class="pb-2 text-stone-900 text-xl">Suggested topics</h2>
            <TopicList :limit="suggested_limit" />

            <NuxtLink to="/suggestions">
                <div
                    class="text-center transition-all w-fit mx-auto hover:text-stone-900 rounded-sm cursor-pointer mt-4 text-sm text-stone-400">
                    See all suggested topics
                </div>
            </NuxtLink>

        </div>

        <div class="flex  w-full mx-auto justify-start flex-col">
            <div class="pattern-dots z-[-1] h-[250px] w-full absolute pattern-stone-300 pattern-bg-transparent
  pattern-size-2 pattern-opacity-100">
            </div>
            <div class="absolute bg-gradient-to-t z-[-1] from-[#F8F7F2] to-transparent w-full h-[250px]"></div>
            <div class="p-4 py-8">
                <h2 class=" pb-4 text-2xl text-stone-900 font-bold text-center">Feeling lucky?</h2>
                <button
                    class="p-2 max-w-[500px] mx-auto w-full flex justify-center gap-2 items-center bg-stone-900 text-white hover:bg-opacity-90 rounded-md"
                    @click="subscribe">

                    <p>
                        Listen
                        to a Random Episode
                    </p>
                    <Dice class="text-white text-lg" />
                </button>
            </div>


        </div>
        <div class="flex p-8 gap-2 flex-col justify-center items-center">
            <h2 class="text-xl">Support the show 🙏</h2>
            <Support class="" />
            <NuxtLink :to="{ path: '/about', query: { section: 'support' } }"
                class="text-stone-400 transition-all text-sm cursor-pointer hover:text-stone-900">What
                am
                I supporting?
            </NuxtLink>
        </div>



    </div>
</template>

<script setup>
import ChevronDown from '~icons/heroicons/chevron-down-16-solid'
import { collection } from 'firebase/firestore';
import Dice from '~icons/mdi/dice'



const db = useFirestore()
const colRef = collection(db, 'episodes')
const episodes = useCollection(colRef)
// const topics = ref([{ name: 'About superposition', votes: 10 }])
// come up with featured episodes 3 of them
const colors = [
    '#A3A7FC', // light cool blue
    '#F1B2D8', // soft warm pink
    '#F6D78B', // muted warm yellow
    '#C6D0BC', // gentle desaturated green
    '#8CA3F4', // darker, saturated blue
    '#E3A0C7', // deeper pink
    '#EEC769', // vibrant yellow-orange
    '#AABEA1'  // deeper green
];

const featured_limit = ref(4)
const suggested_limit = ref(5)

</script>

<style></style>