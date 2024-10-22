<template>
    <div>
        <h1 class="text-2xl text-stone-900 max-w-[800px] mx-auto font-bold p-4">Episodes</h1>
        <div class="pattern-dots z-[-1] h-[250px] w-full absolute pattern-stone-300 pattern-bg-transparent
  pattern-size-2 pattern-opacity-100">
        </div>
        <div class="absolute bg-gradient-to-t z-[-1] from-[#F8F7F2] to-transparent w-full h-[250px]"></div>
        <div class="p-8 gap-4 flex flex-col text-center text-stone-900">
            <h3 class="sm:text-3xl text-2xl mx-auto font-medium max-w-[28ch] "><b>Our catalogue</b> of
                exciting
                episodes is at your <b class="text-purple-500">fingertips</b>
            </h3>
            <h4 class="max-w-[38ch] sm:text-xl text-lg mx-auto">
                From simple introductions to deep dives in the field of AI. We've got <b>something for everyone.</b>
            </h4>
        </div>
        <NuxtLayout name="custom">

            <div class="h-full w-full relative">

                <div class="w-full grid grid-rows-[1fr,1fr] gap-4">
                    <div class="">
                        <h2 class="text-xl pb-2 text-stone-900">Popular</h2>
                        <Cards :items="episodes?.data" :colors="colors" />
                    </div>
                    <div class="">
                        <h2 class="text-xl text-stone-900 pb-2">Seasons</h2>
                        <Cards path="/seasons" :items="seasons?.data" :title="true" :colors="colors" />
                    </div>
                    <div class="">
                        <h2 class="text-xl text-stone-900 pb-2">All episodes</h2>
                        <Cards :items="episodes?.data" :colors="colors" />
                    </div>
                </div>
            </div>

        </NuxtLayout>
    </div>
</template>



<script setup>


const colors = [
    '#A3A7FC', // light cool blue
    '#F1B2D8', // soft warm pink
    '#F6D78B', // muted warm yellow
    '#C6D0BC', // gentle desaturated green
];


const { episodes } = useEpisodes(undefined, 'desc', 'all_episodes')

const { seasons } = useSeasons(undefined, 'desc', 'all_seasons')


// const seasonRef = collection(db, 'seasons')

// const { data: seasons, refresh: refreshSeasons } = await useAsyncData('seasons', () => {
//     return useCollection(seasonRef, { once: true })
// }, {
//     key: 'seasons',
//     // Custom cache strategy
//     transform: (data) => {
//         return {
//             data,
//             fetchedAt: Date.now(),
//         };
//     },
//     getCachedData: (key) => {
//         const cachedData = nuxt.payload.data[key] || nuxt.static.data[key] || null
//         if (!cachedData) {
//             return
//         }
//         if (Date.now() - cachedData.fetchedAt > 1000 * 60) {
//             return
//         }
//         return cachedData
//     },
//     immediate: false,  // Don't fetch immediately on first load (SSR) unless triggered on the client
// });

// onMounted(() => {
//     if (!episodes.value) {
//         refresh()
//     }
//     if (!seasons.value) {
//         refreshSeasons()
//     }

// })

// 5 fake episodes with name, description, and id and 10


</script>


<style lang=" scss" scoped>
                        </style>
