<template>
    <div class="flex justify-between items-center sticky top-0">
        <NuxtLink class="flex items-center gap-2" to="/">
            <img class="size-6" src="../assets/logo.png" alt="">
            <header class="font-medium">The Turing Talks</header>
        </NuxtLink>
        <div class="flex gap-4 items-center">
            <NuxtLink class="hover:bg-stone-900 bg-stone-700 rounded-md px-2 text-white p-1 text-sm" to="/catalogue">
                Listen
                now
            </NuxtLink>
            <Menu class="text-xl sm:hidden text-stone-800" />
            <NuxtLink class="text-sm hidden sm:flex hover:bg-stone-200 rounded-md  p-1 px-2" to="/upcoming">Episodes
            </NuxtLink>
            <NuxtLink class="text-sm hidden sm:flex hover:bg-stone-200 rounded-md  p-1 px-2" to="/upcoming">Suggestions
            </NuxtLink>
            <NuxtLink class="text-sm hidden sm:flex hover:bg-stone-200 rounded-md  p-1 px-2" to="/upcoming">About
            </NuxtLink>
            <NuxtLink class="text-sm hidden sm:flex hover:bg-stone-200 rounded-md  p-1 px-2" to="/upcoming">Support
            </NuxtLink>

        </div>
    </div>
</template>

<script setup>
import Menu from '~icons/heroicons/bars-3-bottom-right-16-solid'
</script>


<style lang="scss" scoped></style>