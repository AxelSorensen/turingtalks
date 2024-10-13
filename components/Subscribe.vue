<template>
    <div class="w-full max-w-[500px] mx-auto items-center p-4 flex flex-col gap-2">
        <div class="flex items-center">
            <h2 class="text-stone-900 text-xl p-2">Subscribe to stay notified</h2>
            <Bell class="text-stone-900 text-lg" />
        </div>
        <input v-model="data.name"
            class="w-full outline-stone-700 p-2 max-w-[500px] mx-auto text-stone-900 placeholder-stone-400 rounded-md bg-white"
            type="text" placeholder="Your name">
        <input v-model="data.email"
            class="w-full outline-stone-700 p-2 max-w-[500px] mx-auto text-stone-900 placeholder-stone-400 rounded-md bg-white"
            type="text" placeholder="Your email">
        <button class="p-2 w-full bg-stone-900 text-white hover:bg-stone-900 rounded-md"
            @click="subscribe">Subscribe</button>
    </div>
</template>

<script setup>
import Bell from '~icons/heroicons/bell-16-solid'
const subscribe = () => {

}

const data = ref({
    name: '',
    email: ''
})


</script>

<style lang="scss" scoped></style>