<template>
    <div class="flex-col w-full p-2 flex">



        <div class="flex flex-col gap-2 pb-2">
            <!-- <div class="text-center">A podcast about...</div> -->

            <input class="w-full p-2 text-stone-900 placeholder-stone-400 rounded-md bg-stone-200" type="text"
                placeholder="Write your suggestion (e.g. AI's effect on climate change)" v-model="data.name">
        </div>
        <!-- <div class="relative flex items-center pt-4 pb-2">
            <div class="flex-grow border-t border-gray-400"></div>
            <span class="flex-shrink mx-4 text-gray-400 text-xs">Optional</span>
            <div class="flex-grow border-t border-gray-400"></div>
        </div> -->
        <!-- <div class="flex flex-col gap-2 pb-8">
            <div class="flex flex-col">
                <label>Description</label>

                <textarea class="w-full resize-none" type="text" placeholder="Desribe the topic proposal"
                    v-model="data.description"></textarea>
            </div>
            <div class="flex flex-col">
                <div class="flex justify-between">
                    <label>Sources</label>
                </div>
                <div v-if="data.sources.length" class="flex flex-col pb-4">
                    <div class="flex items-center" v-for="source, id in data.sources">
                        <p type="text" class="w-full" placeholder="Add link to source">{{ source }}</p>
                        <button class="whitespace-nowrap" @click="removeSource(id)">- Remove</button>
                    </div>
                </div>
                <div class="flex items-center justify-between gap-4">
                    <div class="w-full">
                        <input :class="{ 'ring-1': error.source }" type="text" class="w-full ring-red-500"
                            placeholder="Add link to source" v-model="new_source">
                        <p class="text-red-500 absolute text-xs">{{ error.source }}</p>
                    </div>
                    <button class="whitespace-nowrap" @click="addSource">+ Add source</button>
                </div>
            </div>
        </div> -->

        <button v-if="data.name" class="p-2 bg-stone-700 hover:bg-stone-900 rounded-md text-white"
            @click="postSuggestion">Post
            suggestion</button>
    </div>
</template>

<script setup>

import { doc, addDoc, collection } from "firebase/firestore";
const db = useFirestore()

const data = ref({
    name: '',
    description: '',
    sources: [],
    votes: 0,
})

const error = ref({
    source: null
})

const new_source = ref('')

const addSource = () => {
    if (!new_source.value) {
        error.value.source = "Please add a source"
        return
    }
    error.value.source = null
    data.value.sources.push(new_source.value)
}

const removeSource = (id) => {
    data.value.sources.splice(id, 1)
}

const postSuggestion = async () => {
    let data_buffer = data.value
    data.value = {
        name: '',
        description: '',
        sources: [],
        votes: 0,
    }
    await addDoc(collection(db, "topics"), { ...data_buffer, date: new Date() });
}

const sources = ref([])


</script>

<style lang="scss" scoped></style>