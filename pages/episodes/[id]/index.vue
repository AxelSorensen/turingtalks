<template>


    <div class="grid grid-rows-[auto,auto,auto,1fr] h-full grid-cols-1">

        <div :style="{ backgroundColor: color }" class=" p-4">
            <div class="max-w-[800px] mx-auto">
                <div class="flex items-center gap-8 justify-between ">
                    <h1 class="text-2xl  font-bold pb-2">{{ episode?.title }}</h1>

                </div>
                <div @click="summary_open = !summary_open" class="flex flex-col">
                    <div class="flex text-stone-900 items-center hover:text-black rounded-md cursor-pointer">
                        <h2 class=" font-medium">Summary</h2>
                        <div class=" flex mt-[1px]">
                        </div>
                        <ChevronLeft :class="[summary_open ? 'rotate-180' : null]" class="text-lg mt-[2px]" />
                    </div>
                    <p :class="[summary_open ? null : 'line-clamp-3']" v-html="episode?.description" class="text-sm">
                    </p>

                </div>
                <div class="flex justify-center pt-4">
                    <audio preload class="w-full" controls :src="episode?.audio_url" @loadedmetadata="refresh"></audio>
                </div>
            </div>
        </div>
        <div>
            <NuxtLayout name="custom">


                <div class=" mb-24">
                    <div class=" gap-2 flex justify-between items-center">
                        <div @click="sources_open = !sources_open"
                            class="flex text-gray-500 items-center hover:text-black rounded-md cursor-pointer">
                            <h2 class=" font-medium">Sources</h2>
                            <div class=" flex mt-[1px]">
                            </div>
                            <ChevronLeft :class="[sources_open ? 'rotate-180' : null]" class="text-lg mt-[2px]" />
                        </div>
                        <div class="flex gap-4 items-center ">

                            <div v-if="copied" class="text-sm flex gap-2  rounded-full  text-stone-700">
                                <ClipBoard />
                                <p>
                                    Link
                                    copied
                                </p>
                            </div>

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
                        <a :href="source.url" v-for=" source in episode?.sources" class="">
                            <div class="bg-stone-200 hover:bg-stone-300 my-2 p-2 rounded-md">
                                <h3 class="text-sm font-medium">{{ source.title }}</h3>
                                <p class=" text-blue-900 truncate text-sm">{{
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
            </NuxtLayout>
        </div>

    </div>

</template>

<script setup>
definePageMeta({
    scrollToTop: true
})
import { useClipboard } from '@vueuse/core'
const route = useRoute()
const shareLink = `https://theturingtalks.com/episodes/${route.params.id}`
const { text, copy, copied, isSupported } = useClipboard({ shareLink })
import ChevronLeft from '~icons/heroicons/chevron-down-16-solid'
import Heart from '~icons/fa/heart'
import Link from '~icons/heroicons/link-16-solid'
import ClipBoard from '~icons/heroicons/clipboard-document-16-solid'
import { doc, addDoc, collection } from 'firebase/firestore';
const sources_open = ref(false)
const summary_open = ref(false)
const liked = ref(false)
const color = route.query.color


const db = useFirestore()

const colRef = collection(db, 'episodes', route.params.id, 'comments')

const docRef = doc(db, 'episodes', route.params.id)
const episode = useDocument(docRef)


</script>


<style lang="scss" scoped></style>