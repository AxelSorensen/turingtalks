<template>
    <div>
        <h1 class="text-2xl text-stone-900 max-w-[800px] mx-auto font-bold p-4"><span
                class="text-stone-400">Seasons</span>
            / {{ season.title
            }}</h1>

        <NuxtLayout name="custom">

            <div class="h-full w-full relative">

                <div class="">
                    <h2 class="text-xl pb-2 text-stone-900">Episodes</h2>
                    <Cards :items="episodes" :colors="colors" />
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
import { collection, doc, where, query, orderBy, documentId } from 'firebase/firestore';

const colors = [
    '#A3A7FC', // light cool blue
    '#F1B2D8', // soft warm pink
    '#F6D78B', // muted warm yellow
    '#C6D0BC', // gentle desaturated green

];
const db = useFirestore()
const route = useRoute()
const seasonRef = doc(db, 'seasons', route.params.id)
const season = useDocument(seasonRef)
const q = query(collection(db, 'episodes'), where(documentId(), 'in', season.value.episodes))
const episodes = useCollection(q)

// 5 fake episodes with name, description, and id and 10



</script>


<style lang=" scss" scoped>
                        </style>
