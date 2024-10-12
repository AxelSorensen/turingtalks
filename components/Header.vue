<template>
    <div class="flex justify-between sticky top-0">
        <NuxtLink to="/">
            <header>The Turing Talks</header>
        </NuxtLink>
        <div class="flex gap-4 items-center">
            <NuxtLink class="hover:bg-black bg-stone-700 rounded-md px-2 text-white p-1 text-sm" to="/catalogue">
                Listen
                now
            </NuxtLink>

            <NuxtLink class="text-sm  hover:bg-stone-200 rounded-md  p-1 px-2" to="/upcoming">Upcoming
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>