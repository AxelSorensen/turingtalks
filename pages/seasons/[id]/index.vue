<template>
    <div>
        <h1 class="text-2xl text-stone-900 max-w-[800px] mx-auto font-bold p-4"><span
                class="text-stone-400">Seasons</span>
            / {{ route.query.title || episodes?.data?.title
            }}</h1>

        <NuxtLayout name="custom">

            <div class="h-full w-full relative">

                <div class="">
                    <h2 class="text-xl pb-2 text-stone-900">Episodes</h2>
                    <Cards :title="true" :items="episodes?.data" :colors="colors" />

                </div>
                <!-- <div class="">
                        <h2 class="text-xl text-stone-900 pb-2">Seasons</h2>
                        <Cards :items="seasons" :colors="colors" />
                    </div>
                    <div class="">
                        <h2 class="text-xl text-stone-900 pb-2">All episodes</h2>
                        <Cards :items="episodes" :colors="colors" />
                    </div> -->

            </div>

        </NuxtLayout>
    </div>
</template>



<script setup>
import { doc, getDocs, getDoc, documentId, query, where, collection } from 'firebase/firestore'

const route = useRoute()
const { $db } = useNuxtApp()
const nuxt = useNuxtApp()
// Use useAsyncData to fetch and cache episodes
const { data: episodes, refresh } = useAsyncData(`episodes-from-season-${route.params.id}`, async () => {
  // Fetch season document to get the episode IDs
  const ep_ids = await getDoc(doc($db, 'seasons', route.params.id))
  const ep_ids_ = ep_ids.data().episodes
  
  // Query the episodes based on the episode IDs
  const eps = await getDocs(query(collection($db, 'episodes'), where(documentId(), 'in', ep_ids_)))

  // Return the episodes data
return eps.docs.map(doc => ({ id: doc.id, ...doc.data() }))

}, {
        key: `episodes-from-season-${route.params.id}`,
        transform: (data) => {
            return {
                data,
                fetchedAt: Date.now(),
            }
        },
        getCachedData: (key) => {
            const cachedData = nuxt.payload.data[key] || nuxt.static.data[key] || null
            if (!cachedData) {
                return
            }
            if (Date.now() - cachedData.fetchedAt > 1000 * 60) { // 1 minute cache
                return
            }
            return cachedData
        }
} )

// You can use onMounted if you want to perform any actions specific to the client
onMounted(() => {
    if(!nuxt.payload.data[`episodes-from-season-${route.params.id}`] || !nuxt.static.data[`episodes-from-season-${route.params.id}`]) {
        refresh()
    }
  // Any additional client-side logic can go here, if needed
  // episodes.value is already fetched and cached at this point
})
</script>


<style lang=" scss" scoped>
                        </style>
