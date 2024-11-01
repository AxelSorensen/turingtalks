<template>
    <div class="flex-col w-full max-w-[500px] flex">
        <div class="flex relative flex-col gap-2 pb-2 ">
            <!-- <div class="text-center">A podcast about...</div> -->

            <input maxlength="50"
                class="w-full peer outline-stone-700 p-2 mx-auto text-stone-900 placeholder-stone-400 rounded-md bg-stone-200"
                type="text" placeholder="Write your suggestion (max. 50 characters)" v-model="data.title">
            <p class="absolute peer-focus:flex hidden right-2 text-stone-900 opacity-40 text-xs top-3">{{
                data.title.length }}/50
            </p>
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

        <button v-if="data.title"
            :class="[data.title.length < 50 ? 'bg-stone-900 text-white' : 'text-red-500 border-2 border-red-500 pointer-events-none', post_error ? 'animate-shake' : '']"
            class="p-2 hover:bg-stone-700 rounded-md " @click="post">{{ data.title.length < 50 ? 'Post suggestion'
                : 'Keep it short, max 50 characters' }}</button>
    </div>
</template>

<script setup>
import { useTimeAgo } from '@vueuse/core';
import { doc, getDoc, setDoc } from 'firebase/firestore'
const post_error = ref(false)
const data = ref({
    title: '',
    votes: 0,
})

const error = ref({
    source: null
})

const props = defineProps({
    items: Array,
    postSuggestion: Function,
    fetch_key: String
})

const { items, postSuggestion, fetch_key } = toRefs(props)


// const addSource = () => {
//     if (!new_source.value) {
//         error.value.source = "Please add a source"
//         return
//     }
//     error.value.source = null
//     data.value.sources.push(new_source.value)
// }

const show_login_modal = useState('show_login_modal')
const user = useCookie('user')
const db = useFirestore()
const emit = defineEmits(['posted'])
const { $setToast } = useNuxtApp()
const post = async () => {
    if (!user.value) {
        show_login_modal.value = true
        return
    }
    const docRef = doc(db, 'users', user?.value?.uid)

    const last_suggested = new Date().getTime() - new Date(user.value.last_suggested?.seconds * 1000).getTime()
    const expiration = 60 * 60 * 24 * 7 * 1000

    const remaining_time = expiration - last_suggested

    // // Check if user has suggested in the last 7 days if date now is more than 7 days after last_suggested
    // if (user.value.last_suggested?.seconds && remaining_time > 0) {
    //     post_error.value = true
    //     setTimeout(() => {

    //         post_error.value = false
    //     }, 1000)
    //     // Get days until 0 and format as X days X hours X minutes
    //     const days_until = 7 - Math.round(last_suggested / (60 * 60 * 24 * 1000))
    //     $setToast({ title: 'Suggestion limit', text: 'You can only suggest 1 topic per week. Try again in ' + days_until + ' days.' })
    //     return

    // }
    const date_suggested = new Date()

    user.value.last_suggested = { seconds: date_suggested.getTime() / 1000 }
    setDoc(docRef, { last_suggested: date_suggested }, { merge: true })


    const data_with_date = { ...data?.value, date: { seconds: new Date().getTime() } }
    const modified_data_with_date = { ...data_with_date, votes: 1 }
    items?.value?.splice(0, 0, { just_added: true, ...modified_data_with_date })
    data.value = { title: '', votes: 0 }
    await props.postSuggestion(data_with_date)
    // emit posted 
    emit('posted')
    refreshNuxtData('my_suggestions')
    setTimeout(() => {
        refreshNuxtData('suggestions')
        refreshNuxtData('suggestions-front-page')
    }, 5000)
}




const sources = ref([])


</script>

<style lang="scss" scoped></style>