<template>
    <div class="flex flex-col gap-2 p-4 relative bg-gradient-to-t to-transparent backdrop-blur-2xl z-100 w-full h-full">
        <CountDown />
        <Subscribe />

        <div class="mt-8 text-sm text-stone-400 text-center">Powered by Notebook LM</div>
    </div>
    <div class="relative">
        <div class="bg-[#C6D0BC] absolute z-[-200] bottom-0 left-0  w-40 h-20">
        </div>
        <div class="bg-[#F6D78B] absolute bottom-20 z-[-200] left-40 w-40 h-20">
        </div>
        <div class="bg-[#F1B2D8] absolute bottom-20 z-[-200] right-0 w-40 h-20">
        </div>
        <div class="bg-[#A3A7FC] absolute bottom-20 z-[-200] right-[50%] w-40 h-20">
        </div>

    </div>

</template>

<script setup>
const user = useCookie('user')

['#A3A7FC', '#F1B2D8', '#F6D78B', '#C6D0BC']

</script>

<style lang="scss" scoped></style>