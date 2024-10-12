<template>
    <NuxtLayout name="custom">
        <div class="h-full w-full relative">
            <h1 class="text-2xl text-[#572D29] font-bold pb-4">Catalogue</h1>
            <div class="w-full grid grid-rows-[1fr,1fr] gap-4">

                <div class="">
                    <h2 class="text-xl pb-2 text-[#572D29]">Popular</h2>
                    <Cards :items="episodes" />
                </div>
                <div class="">
                    <h2 class="text-xl text-[#572D29] pb-2">Seasons</h2>
                    <Cards :items="episodes" />
                </div>
                <div class="">
                    <h2 class="text-xl text-[#572D29] pb-2">All episodes</h2>
                    <Cards :items="episodes" />
                </div>


            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { collection } from 'firebase/firestore';


const db = useFirestore()
const colRef = collection(db, 'episodes')
const episodes = useCollection(colRef)
// 5 fake episodes with name, description, and id and 10



</script>


<style lang=" scss" scoped>
                        </style>
