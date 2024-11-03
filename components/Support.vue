<template>
    <div class="flex items-center h-10 text-white flex-col gap-2 justify-center">
        <a class="hover:brightness-110 hover:scale-105 z-10 transition-all" target="_blank"
            href="https://www.buymeacoffee.com/theturingtalks"><img
                src="https://img.buymeacoffee.com/button-api/?text=Buy us a coffee&emoji=&slug=theturingtalks&button_colour=5F7FFF&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00" /></a>
        <NuxtLink to="https://www.buymeacoffee.com/theturingtalks"
            class="absolute hover:brightness-110 hover:scale-105 transition-all left-5 gap-2 flex p-3  px-8 rounded-lg  bg-[#5F7FFF]">
            <Coffee class="h-6 w-6" />
            <p class="font-medium">Buy us a coffee</p>
        </NuxtLink>

    </div>

</template>

<script setup>
import Coffee from '~icons/mdi/coffee';

</script>

<style lang="scss" scoped></style>