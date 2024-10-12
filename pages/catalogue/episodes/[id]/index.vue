<template>
    <NuxtLayout name="custom">

        <div class="grid grid-rows-[auto,auto,auto] h-full grid-cols-1">
            <div class="">
                <div class="flex items-center gap-8 justify-between ">
                    <h1 class="text-2xl  font-bold pb-2">{{ episode.title }}</h1>

                </div>
                <div class="flex flex-col">
                    <h4 class="font-medium">Summary:</h4>
                    <p v-html="episode.description" class="text-sm"></p>
                </div>
            </div>
            <div class="flex justify-center pt-4">
                <audio preload class="w-full" controls :src="episode.audio_url" @loadedmetadata="refresh"></audio>
            </div>
            <div class="my-4 mb-24">
                <div class=" gap-2 flex justify-between items-center">
                    <div @click="showSources"
                        class="flex text-gray-500 items-center hover:text-black rounded-md cursor-pointer">
                        <h2 class=" font-medium">Sources</h2>
                        <div class=" flex mt-[1px]">
                        </div>
                        <ChevronLeft :class="[sources_open ? 'rotate-180' : null]" class="text-lg mt-[2px]" />
                    </div>
                    <div class="flex gap-4 items-center ">
                        <div v-if="copied" class="text-sm px-2 bg-green-100 rounded-sm  text-green-700">Episode link
                            copied</div>
                        <div v-else @click=" copy(shareLink)"
                            class="flex items-center cursor-pointer  text-gray-500 hover:text-black gap-1">

                            <button>Share</button>
                            <Link class="text-[18px]" />
                        </div>
                        <div class="flex items-center text-gray-500 gap-1">
                            <button>Like</button>
                            <Heart
                                :class="[liked ? 'text-red-500 hover:text-red-600' : 'text-gray-300 hover:text-red-500']"
                                @click="liked = !liked" class="mr-4  text-gray-500  cursor-pointer" />
                        </div>

                    </div>

                </div>

                <div class="pt-2" v-if="sources_open">
                    <a :href="source.url" v-for=" source in episode.sources" class="">
                        <div class="bg-gray-100 hover:bg-gray-200 my-2 p-2 rounded-md">
                            <h3 class="text-sm font-medium">{{ source.name }}</h3>
                            <p class=" text-purple-500 text-sm">{{
                                source.url }}</p>
                        </div>
                    </a>
                </div>

            </div>


            <div class="grid grid-rows-[auto,auto,1fr] h-full grid-cols-1">
                <div>
                    <h3 class=" text-sm pb-2 font-medium">Join the discussion</h3>
                    <PostComment :colRef="colRef" />
                </div>
                <h2 class="font-medium pb-2">Comments:</h2>
                <div class="">
                    <CommentSection :colRef="colRef" />
                </div>
            </div>


        </div>
    </NuxtLayout>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
const route = useRoute()
const shareLink = `https://theturingtalks.com/catalogue/episodes/${route.params.id}`
const { text, copy, copied, isSupported } = useClipboard({ shareLink })
import ChevronLeft from '~icons/heroicons/chevron-down-16-solid'
import Heart from '~icons/fa/heart'
import Link from '~icons/heroicons/link-16-solid'
import { ref as storageRef } from 'firebase/storage'
import { doc, addDoc, collection } from 'firebase/firestore';
const sources_open = ref(false)

const showSources = () => {
    sources_open.value = !sources_open.value
}

const liked = ref(false)


const storage = useFirebaseStorage()
console.log(storage)

const db = useFirestore()

const colRef = collection(db, 'episodes', route.params.id, 'comments')

const docRef = doc(db, 'episodes', route.params.id)
const episode = useDocument(docRef)


</script>


<style lang="scss" scoped></style>