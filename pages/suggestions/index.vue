<template>

    <div class="h-full  w-full text-stone-900 mx-auto ">


        <h1 class="text-2xl text-stone-900 max-w-[800px] mx-auto font-bold p-4">Suggestions</h1>
        <div class="pattern-dots z-[-1] h-[250px] w-full absolute pattern-stone-300 pattern-bg-transparent
  pattern-size-2 pattern-opacity-100">
        </div>
        <div class="absolute bg-gradient-to-t z-[-1] from-[#F8F7F2] to-transparent w-full h-[250px]"></div>
        <div class="p-8 gap-4 flex flex-col text-center text-stone-900">
            <h3 class="sm:text-3xl text-2xl mx-auto font-medium max-w-[28ch] "><b>Every week</b> we dive into a <b
                    class="text-purple-500">new
                    topic.</b>
            </h3>
            <h4 class="max-w-[38ch] sm:text-xl text-lg mx-auto">
                Help us make the show better by suggesting topics you'd like covered. <b>We're all ears!</b>
            </h4>
        </div>

        <div>
            <NuxtLayout name="custom">
                <div class="flex pt-4 -mb-4 flex-col  items-center">
                    <h2 class="sm:text-3xl text-2xl font-bold">What should we cover next?</h2>
                    <PostSuggestion class="-mt-4" :items="suggestions?.data" :post-suggestion="postSuggestion"
                        @posted="scrollToSuggestion" fetch_key="suggestions" />
                </div>
                <div class="flex  justify-start pt-2 flex-col">
                    <h2 ref="suggestions_ref" class="pb-2 text-xl">Suggested topics</h2>
                    <Suggestions v-if="suggestions?.data?.length" :items="suggestions?.data" :more_sugs="more_sugs"
                        :sug_limit="sug_limit" />
                    <div class="flex flex-col mt-8 gap-2" v-else>
                        <p class="text-center text-sm text-stone-400">No suggestions yet
                        </p>

                    </div>
                    <button v-if="more_sugs && suggestions?.data?.length >= 10"
                        class="text-stone-700 hover:text-stone-900 text-sm mt-4" @click="viewMoreEpisodes">Show
                        more</button>

                </div>


            </NuxtLayout>
        </div>

    </div>

</template>


<script setup>
useHead({
    title: 'Suggestions | The Turing Talks',
    meta: [
        {
            name: 'description', content: "Every week we dive into a new topic. Help us make the show better by suggesting topics you'd like covered. We're all ears!"
        }
    ],

})
const suggestions_ref = ref(null)
const { suggestions, more_sugs, sug_limit, postSuggestion } = await useSuggestions('suggestions')

const viewMoreEpisodes = () => {
    sug_limit.value += 10
}

const scrollToSuggestion = () => {

    suggestions_ref.value.scrollIntoView({ behavior: 'smooth', block: 'center' });


}


</script>


<style lang=" scss" scoped>
                        </style>
