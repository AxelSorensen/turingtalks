<template>
    <div class="flex-col w-full max-w-[500px] flex">



        <div class="flex flex-col gap-2 pb-2 ">
            <!-- <div class="text-center">A podcast about...</div> -->

            <input maxlength="50"
                class="w-full outline-stone-700 p-2 mx-auto text-stone-900 placeholder-stone-400 rounded-md bg-stone-200"
                type="text" placeholder="Write your suggestion (e.g. AI's effect on climate change)"
                v-model="data.title">
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
            :class="[data.title.length < 50 ? 'bg-stone-900 text-white' : 'text-red-500 border-2 border-red-500 pointer-events-none']"
            class="p-2 hover:bg-stone-700 rounded-md " @click="post">{{ data.title.length < 50 ? 'Post suggestion'
                : 'Keep it short, max 50 characters' }}</button>
    </div>
</template>

<script setup>

const data = ref({
    title: '',
    votes: 1,
})

const error = ref({
    source: null
})

const props = defineProps({
    items: Array,
    postSuggestion: Function,
    key: String
})

const { items, key } = toRefs(props)

const new_source = ref('')

const addSource = () => {
    if (!new_source.value) {
        error.value.source = "Please add a source"
        return
    }
    error.value.source = null
    data.value.sources.push(new_source.value)
}

const show_modal = useState('show_modal')
const user = useCookie('user')
const post = async () => {
    if (!user.value) {
        show_modal.value = true
        return
    }
    const data_with_date = { ...data?.value, date: { seconds: new Date().getTime() } }
    data.value = { title: '', votes: 1 }
    items?.value?.splice(0, 0, { just_added: true, ...data_with_date })
    await props.postSuggestion(data_with_date)
    setTimeout(() => {
        refreshNuxtData(key)
    }, 5000)
}

const removeSource = (id) => {
    data.value.sources.splice(id, 1)
}

const sources = ref([])


</script>

<style lang="scss" scoped></style>