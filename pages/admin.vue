<template>
    <div>
        <NuxtLayout name="custom">
            <div class="flex flex-col">
                <label for="title">Title</label>
                <input type="text" v-model="data.title">
                <label for="sources">Sources</label>
                <div class="flex flex-col gap-4">
                    <div class="bg-stone-400 p-2 flex justify-between font-bold" v-for="source, id in data.sources">
                        <p>{{ source.title }}</p>
                        <button @click="data.sources.splice(id, 1)">X</button>
                    </div>
                    <div class="flex flex-col gap-2">
                        <input placeholder="Title of source" type="text" v-model="new_source.title">
                        <input placeholder="URL of source" type="text" v-model="new_source.url">
                    </div>
                </div>
                <button class="bg-stone-900 text-white  w-fit mx-auto p-2 rounded-md mt-2" @click="addSource">+ Add
                    source</button>
                <label for="description">Description</label>
                <textarea v-model="data.description" cols="30" rows="10"></textarea>
                <label for="audio_url">Audio url</label>
                <input type="text" v-model="data.audio_url">
                <label for="duration">Duration</label>
                <input type="text" v-model="data.duration">
                <button @click="submit" class="bg-stone-900 text-white p-2 rounded-md mt-4">Submit</button>
            </div>

        </NuxtLayout>
    </div>
</template>

<script setup>

const new_source = ref({
    title: '',
    url: ''
})

const addSource = () => {
    data.value.sources.push({
        title: new_source.value.title,
        url: new_source.value.url
    })
    new_source.value = {
        title: '',
        url: ''
    }
}

const data = ref({
    title: '',
    sources: [],
    description: '',
    audio_url: '',
    duration: ''
})

import { addDoc, collection } from 'firebase/firestore';

const db = useFirestore()

const colRef = collection(db, 'episodes')

const pending = ref(false)

const submit = async () => {
    try {
        pending.value = true
        await addDoc(colRef, {
            title: data.value.title,
            sources: data.value.sources,
            description: data.value.description,
            audio_url: data.value.audio_url,
            duration: data.value.duration
        })
    } catch (error) {
        console.error(error)
    }
    pending.value = false
}



</script>

<style scoped>
input {
    @apply bg-stone-200 p-2 rounded-md
}

textarea {
    @apply bg-stone-200 p-2 rounded-md
}
</style>