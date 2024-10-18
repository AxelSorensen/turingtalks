<template>
    <div>
        <NuxtLayout name="custom">
            <div class="flex flex-col">
                <h1 class="text-xl mb-4">Episodes</h1>
                <label for="title">Title</label>
                <input type="text" v-model="episode.title">
                <label for="sources">Sources</label>
                <div class="flex flex-col gap-4">
                    <div class="bg-stone-400 p-2 flex justify-between font-bold" v-for="source in episode.sources">
                        <p>{{ source.title }}</p>
                        <button @click="episode.sources.splice(id, 1)">X</button>
                    </div>
                    <div class="flex flex-col gap-2">
                        <input placeholder="Title of source" type="text" v-model="new_source.title">
                        <input placeholder="URL of source" type="text" v-model="new_source.url">
                    </div>
                </div>
                <button class="bg-stone-900 text-white  w-fit mx-auto p-2 rounded-md mt-2" @click="addSource">+ Add
                    source</button>
                <label for="description">Description</label>
                <textarea v-model="episode.description" cols="30" rows="10"></textarea>
                <label for="audio_url">Audio URL</label>
                <input type="text" v-model="episode.audio_url">
                <label for="duration">Duration</label>
                <input type="text" v-model="episode.duration">
                <button @click="submit" class="bg-stone-900 text-white p-2 rounded-md mt-4">Submit</button>
            </div>

            <div class="flex flex-col mt-8">
                <h1 class="text-xl mb-4">Seasons</h1>
                <input v-model="season.title" for="title" placeholder="season name">
                <button @click="addSeason" class="bg-stone-900 text-white p-2 rounded-md my-4">Add to season</button>
                <h1 class="text-lg mb-2 ">Choose episodes</h1>
                <div class="flex flex-col gap-2">
                    <div class="bg-gray-200 flex justify-between p-2" v-for="episode in episodes">
                        <div>{{ episode.title }}</div>
                        <input @change="(e) => pushEpisode(e, episode.id)" type="checkbox">

                    </div>
                </div>
                <h1 class="text-lg mt-2 ">Choose season</h1>

                <select v-model="seasonToAdd" class="p-2 mt-2 bg-gray-400" name="season" id="">
                    <option v-for="season in seasons" :value="season.id">{{ season.title }}</option>
                </select>
                <button @click="addEpisodeToSeason" class="bg-stone-900 text-white p-2 rounded-md mt-4">Add episodes to
                    season</button>

            </div>
            {{ episodesToAdd }}

        </NuxtLayout>
    </div>
</template>

<script setup>
const episode = ref({
    title: '',
    sources: [],
    description: '',
    audio_url: '',
    duration: ''
})

const season = ref({
    title: '',
    episodes: []
})

const new_source = ref({
    title: '',
    url: ''
})

const pushEpisode = (e, id) => {
    if (e.target.checked) {
        episodesToAdd.value.push(id)
    } else {
        episodesToAdd.value = episodesToAdd.value.filter(id => id !== id)
    }
}

const addSource = () => {
    episode.value.sources.push(new_source.value)
    new_source.value = {
        title: '',
        url: ''
    }
}

const addSeason = () => {
    addDoc(collection(db, 'seasons'), {
        title: season.value.title,
        episodes: []
    })
}

const episodesToAdd = ref([])
const seasonToAdd = ref(null)

const addEpisodeToSeason = () => {
    updateDoc(doc(db, 'seasons', seasonToAdd.value), {
        episodes: episodesToAdd.value
    }, { merge: true })
}


import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';



const db = useFirestore()

const colRef = collection(db, 'episodes')

const pending = ref(false)
const episodes = useCollection(collection(db, 'episodes'), { once: true })
const seasons = useCollection(collection(db, 'seasons'), { once: true })
const submit = async () => {
    try {
        pending.value = true
        await addDoc(colRef, {
            title: episode.value.title,
            sources: episode.value.sources,
            description: episode.value.description,
            audio_url: episode.value.audio_url,
            duration: episode.value.duration,
            date: new Date()
        })
    } catch (error) {
        console.error(error)
    }
    pending.value = false
    console.log('submitted')
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