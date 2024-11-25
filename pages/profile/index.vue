<template>
    <div class="h-full  w-full text-stone-900 mx-auto ">
        <h1 class="text-2xl text-stone-900 max-w-[800px] mx-auto font-bold p-4">{{ user ? user?.username + "'s Page"
            : 'Loading...' }}</h1>
        <div class="relative">

            <NuxtLayout name="custom">
                <div>

                    <div class="flex gap-2 items-center mb-4">
                        <Heart class="text-xl" />
                        <h2 class=" text-xl">My Favorites</h2>


                    </div>
                    <div class="flex gap-2 flex-col mb-8">
                        <p v-if="!favorites?.data" class="text-center text-sm text-stone-400">No favorites yet
                        </p>
                        <Cards v-else :items="favorites?.data" :colors="colors" />
                    </div>

                </div>
                <div>
                    <div ref="favorite_ref" class="mb-4 flex gap-2 items-center">
                        <LightBulb class="text-xl" />
                        <h2 class=" text-xl">My suggestions</h2>
                    </div>
                    <div class="flex gap-2 flex-col mb-8">

                        <p v-if="!suggestions?.data" class="text-center text-sm text-stone-400">No suggestions
                            yet
                        </p>
                        <Suggestions v-else :items="suggestions?.data" :colors="colors" />
                    </div>
                </div>
                <hr class="mt-4">
                <div class="flex mt-4 justify-end">
                    <div @click="show_delete_user_modal = true"
                        class="bg-red-100 w-fit p-2 rounded-md border hover:bg-red-200 cursor-pointer text-sm text-red-500 border-red-500">
                        Delete my
                        account</div>
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
const route = useRoute()
const support = ref(null)


import { colors } from '~/utils/colors'
const user = useCookie('user')
const { favorites } = useFavorites(`favorites`)
const favorite_ref = ref(null)
const show_delete_user_modal = useState('show_delete_user_modal')

const { suggestions, refresh } = useMySuggestions('my_suggestions')
</script>
