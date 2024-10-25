<template>

    <div class="h-full  w-full text-stone-900 mx-auto ">


        <h1 class="text-2xl text-stone-900 max-w-[800px] mx-auto font-bold p-4">{{ user ? user?.displayName + "'s Page"
            : 'Loading...' }}</h1>

        <div class="relative">

            <NuxtLayout name="custom">
                <div>

                    <div class="flex gap-2 items-center mb-4">
                        <Heart class="text-xl" />
                        <h2 class=" text-xl">Your Favorites</h2>


                    </div>
                    <div class="flex gap-2 flex-col mb-8">
                        <Cards :items="favorites?.data" :colors="colors" />
                    </div>

                </div>
                <div class="mb-4 flex gap-2 items-center">
                    <LightBulb class="text-xl" />
                    <h2 class=" text-xl">Your suggestions</h2>
                </div>
                <div class="flex gap-2 flex-col mb-8">
                    <Cards :items="favorites?.data" :colors="colors" />
                </div>

                <div class="mb-4 flex gap-2 items-center">
                    <Comment class="text-xl" />
                    <h2 class=" text-xl">Your comments</h2>
                </div>

            </NuxtLayout>


            <div ref="support" class="relative bg-[#EBD9C6] bg-opacity-50">
                <!-- <div ref="support" class="pattern-dots z-0 h-[400px] w-full absolute pattern-stone-300 pattern-bg-transparent
  pattern-size-2 pattern-opacity-100">
                </div>
                <div class="absolute bg-gradient-to-t z-2 from-[#F8F7F2] to-transparent w-full h-[400px]"></div> -->
                <div class="max-w-[800px] p-4 mb-4 relative mx-auto">

                    <h2 class="pb-2 text-xl font-bold">Support us</h2>
                    <p class="max-w-[50ch]">Even though we are AI's we still love a good cup of coffee. Your support
                        is
                        what keeps us
                        going!
                    </p>
                    <div class="flex">
                        <Support class="my-4" />
                    </div>
                    <p class="font-semibold">What am I supporting?</p>
                    <p class="max-w-[50ch]">
                        Your support helps us cover the costs of hosting, curating and processing relevant
                        litterature,
                        building the community
                        and
                        producing new episodes.
                    </p>
                    <p class="mt-4 italic">We are committed to keeping the podcast free and accessible to all.<br>
                        Thank
                        you
                        for making that possible <b class="not-italic font-semibold">- Your grateful hosts</b></p>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import Heart from '~icons/heroicons/heart-16-solid';
import Comment from '~icons/heroicons/chat-bubble-oval-left-ellipsis-16-solid';
import LightBulb from '~icons/heroicons/light-bulb-16-solid';

const support = ref(null)
const user = ref(null)
const favorites = ref([])
import { colors } from '~/utils/colors'

onMounted(async () => {
    user.value = await getCurrentUser()
    // Destructure the values from useEpisodeLiked and assign them to isLiked and likeEpisode
    console.log(user.value.uid)
    const { favorites: favorites_data } = await useFavorites(user.value.uid, `favorites-for-user-${user.value.uid}`)
    // Set the ref values to the data retrieved in onMounted
    favorites.value = favorites_data.value.data

})



</script>
