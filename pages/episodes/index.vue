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

            <div class="h-full w-full relative mb-10">

                <div class="w-full grid grid-rows-[1fr,auto] gap-4">
                    <div class="">
                        <h2 class="text-xl pb-2 text-stone-900">Popular</h2>
                        <Cards :items="popular_episodes?.data" :title="true" :colors="colors" :limit="4" />
                    </div>
                    <div class="">
                        <h2 class="text-xl text-stone-900 pb-2">Seasons</h2>
                        <Cards path="/seasons" :items="seasons?.data" :title="true" :colors="colors" />
                    </div>
                    <!-- <div class="">
                        <h2 class="text-xl text-stone-900 pb-2">All episodes</h2>
                        <Cards :items="episodes?.data" :colors="colors" />
                    </div> -->
                    <div class="">
                        <h2 class="text-xl text-stone-900 pb-2">All Episodes</h2>
                        <Cards :items="episodes?.data" :title="true" :colors="colors" />
                    </div>
                </div>
            </div>

        </NuxtLayout>
    </div>
</template>



<script setup>
useHead({
    title: 'Episodes | The Turing Talks',
    meta: [
        {
            name: 'description', content: "Our catalogue of exciting episodes is at your fingertips. From simple introductions to deep dives in the field of AI. We've got something for everyone."
        }
    ],

})

import { colors } from '~/utils/colors'


const { episodes } = await useEpisodes('all', undefined, 'desc', 'all_episodes')
// We fetch 5 popular episodes because one might be removed if its not published yet
const { popular_episodes } = await usePopularEpisodes(5, 'desc', 'popular_episodes')
const { seasons } = useSeasons(undefined, 'desc', 'all_seasons')

</script>


<style lang=" scss" scoped>
                        </style>
