<template>

    <div class="grid relative mx-auto grid-rows-[auto,auto,auto,] h-full grid-cols-1 justify-center items-center">
        <div class="flex pt-8  flex-col items-center p-4">
            <h1 class="sm:text-5xl text-4xl text-stone-900  font-bold">The Turing Talks</h1>
            <!-- <img class="size-28 text-red-50 absolute mt-[-30px] opacity-5" src="../assets/logo.png" alt=""> -->
            <h2 class="text-lg text-stone-900 ">The first AI-hosted podcast about AI</h2>
            <img class="size-16 mt-4 mb-2" src="~/assets/logo.png" alt="">
        </div>
        <div>fresh: {{ fresh }}</div>
        <div>cache: {{ cache }}</div>

        <div class="flex  px-4 pb-2 flex-col  items-center">
            <h2 class="sm:text-3xl text-2xl text-stone-900 mb-4 font-bold">What should we cover next?</h2>
            <!-- <PostSuggestion @posted="scrollToSuggestion" /> -->

        </div>
        <div class="px-4 max-w-[800px] w-full mx-auto pt-2">
            <h2 class="pb-2 text-xl text-stone-900 ">Latest episodes</h2>
            <!-- <SimpleCards :items="episodes" :colors="colors" :limit="featured_limit" /> -->
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

        <div ref="suggestions" class="flex max-w-[800px] w-full mx-auto px-4 p-2 pb-8 justify-start  flex-col">
            <h2 class="pb-2 text-stone-900 text-xl">Suggested topics</h2>
            <!-- <TopicList :limit="suggested_limit" /> -->

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
                    @click="randomEpisode">

                    <p>
                        Listen
                        to a Random Episode
                    </p>
                    <Dice class="text-white text-lg" />
                </button>
                <div></div>
            </div>


        </div>
        <div class="flex p-8 gap-2 flex-col justify-center items-center">
            <h2 class="text-xl">Support the show 🙏</h2>
            <!-- <Support class="" /> -->
            <NuxtLink :to="{ path: '/about', query: { section: 'support' } }"
                class="text-stone-400 transition-all text-sm cursor-pointer hover:text-stone-900">What
                am
                I supporting?
            </NuxtLink>
        </div>



    </div>
</template>

<script setup>
const { enabled, state } = usePreviewMode()
import Dice from '~icons/mdi/dice'

import {
    signInWithPopup, GoogleAuthProvider
} from 'firebase/auth'


import { collection } from 'firebase/firestore';
// const auth = useFirebaseAuth()
// const user = useCurrentUser() // only exists on client side


const scrollToSuggestion = () => {
    setTimeout(() => {
        suggestions.value.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

}

const randomEpisode = () => {
    // Fetch all episode ids
    const all_episodes = useCollection(collection(db, 'episodes'), { once: true })
    const random_id = Math.floor(Math.random() * all_episodes.value.length)
    navigateTo({ path: `/episodes/${all_episodes.value[random_id].id}`, query: { color: colors[Math.floor(Math.random() * colors.length)] } })
}
// const nuxtApp = useNuxtApp()
const db = useFirestore()
// const { data: episodes } = useAsyncData('episodesKey', async () => {
//     console.log('Fetching episodes')

//     // Firestore collection fetch logic
//     return useCollection(collection(db, 'episodes'), { once: true }).value

// })

const nuxt = useNuxtApp()
const { data: cache } = useNuxtData('episodes')

const { data: fresh, refresh } = useFetch('/api/test', {
    key: 'episodes',
    // Custom cache strategy
    transform: (data) => {
        return {
            data,
            fetchedAt: Date.now(),
        };
    },
    getCachedData: (key) => {
        const cachedData = nuxt.payload.data[key] || nuxt.static.data[key] || null
        if (!cachedData) {
            return
        }
        // Check if data was fetched more than 10 seconds ago
        if (Date.now() - cachedData.fetchedAt > 10000) {
            return
        }
        return cachedData

    },
    immediate: false,  // Don't fetch immediately on first load (SSR) unless triggered on the client
});

onMounted(() => {
    if (!fresh.value) {
        refresh()
    }
})
// const { data: cache } = useNuxtData('episodes')
// const nuxtApp = useNuxtApp()


// Lazy fetching with a proper default value


// Refresh data only if necessary





// const topics = ref([{ name: 'About superposition', votes: 10 }])
// come up with featured episodes 3 of them
const colors = [
    '#A3A7FC', // light cool blue
    '#F1B2D8', // soft warm pink
    '#F6D78B', // muted warm yellow
    '#C6D0BC', // gentle desaturated green
    // deeper green
];

const featured_limit = ref(4)
const suggested_limit = ref(5)

</script>

<style></style>