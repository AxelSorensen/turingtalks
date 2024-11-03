<template>
    <div class="flex items-center h-10 text-white flex-col gap-2 justify-center">

        <NuxtLink to="https://buymeacoffee.com/theturingtalks"
            class="whitespace-nowrap hover:brightness-110 hover:scale-105 transition-all gap-2 flex p-3  px-8 rounded-lg  bg-[#5F7FFF]">
            <Coffee class="h-6 w-6" />
            <p class="font-medium">Buy us a coffee</p>
        </NuxtLink>

    </div>

</template>

<script setup>
import Coffee from '~icons/mdi/coffee';

</script>

<style lang="scss" scoped></style>