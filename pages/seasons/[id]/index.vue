<template>
    <div>
        <h1 class="text-2xl text-stone-900 max-w-[800px] mx-auto font-bold p-4"><span
                class="text-stone-400">Seasons</span>
            / {{ route.query.title
            }}</h1>

        <NuxtLayout name="custom">

            <div class="h-full w-full relative">

                <div class="">
                    <h2 class="text-xl pb-2 text-stone-900">Episodes</h2>
                    <Cards :items="episodes?.data" :colors="colors" />
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
const { episodes } = useEpisodesFromSeason(route.params.id, undefined, 'desc', `all_episodes_from_season-${route.params.id}`)

const colors = [
    '#A3A7FC', // light cool blue
    '#F1B2D8', // soft warm pink
    '#F6D78B', // muted warm yellow
    '#C6D0BC', // gentle desaturated green

];


// 5 fake episodes with name, description, and id and 10



</script>


<style lang=" scss" scoped>
                        </style>
