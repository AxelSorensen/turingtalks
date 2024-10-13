<template>
    <div class="flex justify-between items-center sticky top-0">
        <NuxtLink class="flex items-center gap-2" to="/">
            <img class="size-6" src="../assets/logo.png" alt="">
            <header>The Turing Talks</header>
        </NuxtLink>
        <div class="flex gap-4 items-center">
            <NuxtLink class="hover:bg-black bg-stone-700 rounded-md px-2 text-white p-1 text-sm" to="/catalogue">
                Listen
                now
            </NuxtLink>
            <Menu class="text-xl sm:hidden" />
            <NuxtLink class="text-sm hidden sm:flex hover:bg-stone-200 rounded-md  p-1 px-2" to="/upcoming">Upcoming
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import Menu from '~icons/heroicons/bars-3-bottom-right-16-solid'
</script>


<style lang="scss" scoped></style>