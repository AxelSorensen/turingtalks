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
                        <Cards :items="episodes" :colors="colors" />
                    </div>
                    <div class="">
                        <h2 class="text-xl text-stone-900 pb-2">Seasons</h2>
                        <Cards path="/seasons" :items="seasons" :colors="colors" />
                    </div>
                    <div class="">
                        <h2 class="text-xl text-stone-900 pb-2">All episodes</h2>
                        <Cards :items="episodes" :colors="colors" />
                    </div>
                </div>
            </div>

        </NuxtLayout>
    </div>
</template>



<script setup>
import { collection, query, orderBy } from 'firebase/firestore';

const colors = [
    '#A3A7FC', // light cool blue
    '#F1B2D8', // soft warm pink
    '#F6D78B', // muted warm yellow
    '#C6D0BC', // gentle desaturated green

];
const db = useFirestore()

const q = query(collection(db, 'episodes'), orderBy('date'))
const episodes = useCollection(q)
const seasonRef = collection(db, 'seasons')
const seasons = useCollection(seasonRef)
// 5 fake episodes with name, description, and id and 10



</script>


<style lang=" scss" scoped>
                        </style>
