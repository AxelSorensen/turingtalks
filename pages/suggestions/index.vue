<template>

    <div class="h-full  w-full text-stone-900 mx-auto ">

        <h1 class="text-2xl text-stone-900 max-w-[800px] mx-auto font-bold p-4">Suggestions</h1>

        <div class="p-8 bg-[#EBD9C6] -mx-4 gap-2 flex flex-col text-center text-stone-900">
            <h3 class="sm:text-2xl text-xl mx-auto font-medium max-w-[500px] ">Every week we dive into a <b class="">new
                    topic.</b>
            </h3>
            <h4 class="max-w-[45ch] text-lg mx-auto">
                From
                discussing
                a
                recent paper to
                offering an engaging overview of an emerging field.
            </h4>


        </div>
        <div>
            <NuxtLayout name="custom">

                <div class="flex py-4 pb-8 flex-col  items-center">
                    <h2 class="sm:text-3xl text-2xl pb-4 font-bold">What should we cover next?</h2>
                    <PostSuggestion />
                </div>
                <div class="flex justify-start pt-2  flex-col">
                    <h2 class="pb-2 text-xl">Suggested topics</h2>
                    <TopicList />


                </div>
            </NuxtLayout>
        </div>

    </div>

</template>

<script setup>

import { collection, count } from 'firebase/firestore';


</script>


<style lang=" scss" scoped>
                        </style>
