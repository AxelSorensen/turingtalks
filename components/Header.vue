<template>

    <nav ref="target"
        class="flex flex-col   select-none sm:flex-row justify-between whitespace-nowrap bg-[#F8F7F2]/40 z-10 backdrop-blur-xl"
        :class="{ 'pb-4': nav_open }">
        <div @focusout="nav_open = false" class="flex justify-between items-center  p-4">
            <NuxtLink class="flex items-center gap-2" to="/">
                <img class="size-6" src="~/assets/logo.png" alt="">
                <header class="font-medium text-lg sm:text-base">The Turing Talks</header>
            </NuxtLink>
            <div class="flex items-center  gap-4">
                <NuxtLink class="hover:bg-stone-700  text-base sm:hidden bg-stone-900 rounded-md px-2 text-white p-1"
                    to="/episodes">
                    Listen
                    now
                </NuxtLink>
                <div @click="nav_open = !nav_open"
                    class="text-stone-700 text-2xl w-8 justify-center flex sm:hidden hover:text-stone-900 cursor-pointer">
                    <Menu v-if="!nav_open" />
                    <XMark class="" v-else />
                </div>


            </div>

        </div>

        <div :class="nav_open ? 'block' : 'hidden'" class=" flex items-start flex-col text-stone-500 sm:gap-2 gap-4 sm:flex-row justify-center sm:items-center
            p-4  sm:flex">
            <NuxtLink @click="nav_open = false" v-for="route in routes"
                class="text-base sm:text-sm  nav-links text-stone-600  rounded-md hover:text-stone-900  p-1 px-2"
                :to="route.path">
                {{ route.name }}
            </NuxtLink>
            <div class="text-2xl hidden sm:flex pb-1 leading-5 ml-2 font-thin">|</div>
            <div v-if="user" class="flex h-8 items-center gap-2 mr-2">
                <img :src="user.photoURL" class="rounded-full ml-2 sm:ml-4 w-8 h-8" alt="">
                <div class="sm:text-sm sm:font-medium text-stone-900"> {{
                    user?.displayName }}</div>
            </div>
            <div v-else-if="!nav_open" class="h-8 flex">
                <button @click="signinPopup"
                    class="text-sm ml-2 mr-2 cursor-pointer p-1 px-2 rounded-md hover:bg-stone-200 text-stone-900">
                    Login
                </button>
            </div>

        </div>



    </nav>


</template>

<script setup>


import {
    signInWithPopup, GoogleAuthProvider
} from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'


const auth = useFirebaseAuth()
const user = useCurrentUser() // only exists on client side

// display errors if any
function signinPopup() {

    signInWithPopup(auth, new GoogleAuthProvider())
}
import Menu from '~icons/heroicons/bars-3-bottom-right-16-solid'
import XMark from '~icons/heroicons/x-mark-16-solid'
const target = ref(null)
import { onClickOutside } from '@vueuse/core';
onClickOutside(target, event => nav_open.value = false)
const nav_open = ref(false)

const routes = [
    { name: 'Episodes', path: '/episodes' },
    { name: 'Suggestions', path: '/suggestions' },
    { name: 'About', path: '/about' },
]
</script>


<style scoped>
.nav-links.router-link-exact-active {
    @apply underline underline-offset-8 text-stone-900 decoration-[1.5px] font-medium
}
</style>