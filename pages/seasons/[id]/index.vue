<template>
    <div>

        <h1 class="text-2xl text-stone-900 max-w-[800px] mx-auto font-bold p-4"><span
                class="text-stone-400">Seasons</span>
            / {{ season?.data?.title
            }}</h1>
        <NuxtLayout name="custom">

            <div class="h-full w-full relative mb-10">

                <div class="">
                    <h2 class="text-xl pb-2 text-stone-900">Episodes</h2>
                    <Cards :title="true" :items="filtered_episodes" :colors="colors" />

                </div>
                <!-- <div class="">
                        <h2 class="text-xl text-stone-900 pb-2">Seasons</h2>
                        <Cards :items="seasons" :colors="colors" />
                    </div>
                    <div class="">
                        <h2 class="text-xl text-stone-900 pb-2">All episodes</h2>
                        <Cards :items="episodes" :colors="colors" />
                    </div> -->

            </div>

        </NuxtLayout>
    </div>
</template>



<script setup>


const route = useRoute()

const { episodes } = useEpisodesFromSeason(route.params.id, 'desc', `all_episodes-from-season-${route.params.id}`)
// You can use onMounted if you want to perform any actions specific to the client
const { season } = useSeason(route.params.id, `season-${route.params.id}`)
const filtered_episodes = computed(() => {
    return episodes.value?.data?.filter(episode => episode.date.seconds < Date.now() / 1000)
})
useHead({
    titleTemplate: () => {
        return `${season?.value?.data?.title} | The Turing Talks`
    },

})
</script>


<style lang=" scss" scoped>
                        </style>
