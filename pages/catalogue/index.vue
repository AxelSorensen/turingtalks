<template>
    <NuxtLayout name="custom">
        <div class="h-full w-full relative">
            <h1 class="text-2xl text-stone-900 font-bold pb-4">Catalogue</h1>
            <div class="w-full grid grid-rows-[1fr,1fr] gap-4">
                <div class="">
                    <h2 class="text-xl pb-2 text-stone-900">Popular</h2>
                    <Cards :items="episodes" :colors="colors" />
                </div>
                <div class="">
                    <h2 class="text-xl text-stone-900 pb-2">Seasons</h2>
                    <Cards :items="episodes" :colors="colors" />
                </div>
                <div class="">
                    <h2 class="text-xl text-stone-900 pb-2">All episodes</h2>
                    <Cards :items="episodes" :colors="colors" />
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>



<script setup>
import { collection } from 'firebase/firestore';

const colors = ['#A3A7FC', '#F1B2D8', '#F6D78B', '#C6D0BC']
const db = useFirestore()
const colRef = collection(db, 'episodes')
const episodes = useCollection(colRef)
// 5 fake episodes with name, description, and id and 10



</script>


<style lang=" scss" scoped>
                        </style>
