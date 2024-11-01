<template>
    <div class="grid grid-rows-[auto,auto,auto,1fr] h-full grid-cols-1">
        <div :style="{ backgroundColor: color }" class=" -mt-[4rem] pt-20">
            <div class="max-w-[800px] px-4 pb-4 mx-auto">
                <div class="flex items-center gap-8 justify-between ">
                    <!-- <Spinner class="bg-red-200" v-if="episode?.data?.title" /> -->
                    <h1 class="text-2xl  font-bold pb-2">{{ episode?.data?.title }}</h1>

                </div>
                <div class="h-[5.5rem] pt-2 flex justify-center items-center overflow-hidden"
                    v-if="!episode?.data?.description">
                    <Spinner class="mx-auto" />
                </div>
                <div v-else @click="summary_open = !summary_open" :class="[summary_open ? 'h-full' : 'h-[5.5rem]']"
                    class="flex h-[5.5rem] flex-col">
                    <div class="flex text-stone-900 items-center hover:text-black rounded-md cursor-pointer">
                        <h2 class=" font-medium">Summary</h2>
                        <div class=" flex mt-[1px]">

                        </div>
                        <ChevronLeft :class="[summary_open ? 'rotate-180' : null]" class="text-lg mt-[2px]" />
                    </div>
                    <p :class="[summary_open ? 'null' : 'line-clamp-3']" v-html="episode?.data?.description"
                        class="text-sm">
                    </p>

                </div>
                <div class="flex justify-center pt-4">
                    <audio preload class="w-full" controls :src="episode?.data?.audio_url"></audio>
                </div>

            </div>
        </div>

        <div>
            <NuxtLayout name="custom">
                <div class=" text-sm flex text-stone-900 justify-between items-center">
                    <div @click="sources_open = !sources_open"
                        class="flex  items-center hover:text-black rounded-md cursor-pointer">
                        <h2 class="font-medium">Sources</h2>
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
                            class="flex items-center cursor-pointer  hover:text-black gap-1">

                            <button>Share</button>
                            <Link class="text-[18px]" />
                        </div>
                        <div @click="likeEpisode" class="flex group cursor-pointer items-center gap-1">
                            <button>Like</button>
                            <Heart
                                :class="[isLiked?.data ? 'text-red-500 group-hover:text-red-600' : 'text-stone-300 group-hover:text-stone-400']"
                                class="" />
                        </div>

                    </div>



                </div>
                <div class="pt-4" v-if="sources_open">
                    <a :href="source.url" v-for=" source in episode?.data?.sources" class="">
                        <div class="bg-stone-200 hover:bg-stone-300 my-2 p-2 rounded-md">
                            <h3 class="text-sm font-medium">{{ source.title }}</h3>
                            <p class=" text-blue-900 truncate text-sm">{{
                                source.url }}</p>
                        </div>
                    </a>
                </div>


                <div class="mb-20">

                    <h2 class="font-medium pb-2 mt-4 text-stone-900">You might also like</h2>
                    <SimilarCards :items="similar_episodes?.data" :title="true" :colors="colors" :color="color" />

                </div>


                <CommentSection :ep_id="route.params.id" />

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
import SimilarCards from '~/components/SimilarCards.vue';
import { colors } from '~/utils/colors'
const sources_open = ref(false)
const summary_open = ref(false)
const color = ref('')
color.value = route.query.c
if (!route.query.c) {
    color.value = getRandomColor()
}

const show_login_modal = useState('show_login_modal')

const likeEpisode = async () => {
    if (!user.value) {
        show_login_modal.value = true
        return
    }
    if (isLiked.value.data) {
        isLiked.value.data = false
        await removeLikeFromDatabase()
        refreshFavorites()
    } else {
        isLiked.value.data = true
        await addLikeToDatabase()
        refreshFavorites()


    }
    // await ref_liked()
    // await ref_fav()

}


const { episode } = await useEpisode(route.params.id, `episode-${route.params.id}`)
const { similar_episodes } = useSimilarEpisodes(3, 'desc', `eps_similar_to-${route.params.id}`, route.params.id, episode?.value?.data?.tags)
const user = useCookie('user')
const { refresh: refreshFavorites } = useFavorites(`favorites`)
// Destructure the values from useEpisodeLiked and assign them to isLiked and likeEpisode
const { isLiked, likeEpisode: addLikeToDatabase, unlikeEpisode: removeLikeFromDatabase } = await useEpisodeLiked(route.params.id, `liked-episode-${route.params.id}`)
// Set the ref values to the data retrieved in onMounted








</script>


<style lang="scss" scoped></style>