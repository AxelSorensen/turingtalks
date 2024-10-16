<template>

    <nav ref="target"
        class="flex flex-col select-none sm:flex-row justify-between whitespace-nowrap bg-[#F8F7F2]/40 z-10 backdrop-blur-xl"
        :class="{ 'pb-4': nav_open }">
        <div @focusout="nav_open = false" class="flex justify-between items-center  p-4">
            <NuxtLink class="flex items-center gap-2" to="/">
                <img class="size-6" src="~/assets/logo.png" alt="">
                <header class="font-medium text-lg sm:text-base">The Turing Talks</header>
            </NuxtLink>
            <div class="flex items-center  gap-4">
                <NuxtLink class="hover:bg-stone-700 text-base sm:hidden bg-stone-900 rounded-md px-2 text-white p-1"
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

        <div :class="nav_open ? 'block' : 'hidden'" class=" flex nav-links items-start flex-col text-stone-500 sm:gap-2 gap-4 sm:flex-row justify-center sm:items-center
            p-4 sm:flex">
            <NuxtLink :class="[nav_open ? 'hidden' : 'block']"
                class="hover:bg-stone-700 bg-stone-900 rounded-md px-2 text-white p-1 text-sm">
                Listen
                now
            </NuxtLink>
            <NuxtLink @click="nav_open = false" v-for="route in routes"
                class="text-sm  hover:text-stone-900 rounded-md  p-1 px-2" :to="route.path">
                {{ route.name }}
            </NuxtLink>

        </div>



    </nav>


</template>

<script setup>
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
.nav-links>.router-link-exact-active {
    @apply underline underline-offset-8 text-stone-900 decoration-[1.5px] font-medium
}

.nav-links-mobile>.router-link-exact-active {
    @apply text-stone-900
}
</style>