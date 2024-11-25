<template>
    <div v-if="toast_data"
        class=" bg-stone-100 overflow-hidden text-stone-900  backdrop-blur-xl p-4 relative border-purple-500 rounded-md shadow-lg w-full">
        <div class="flex mb-2 gap-2 items-center">
            <XMark @click="closeToast" class="absolute right-2 top-2 cursor-pointer" />
            <ExclamationCircle />
            <h3 class="font-medium">{{ toast_data?.title }}</h3>
        </div>
        <p class="">{{ toast_data?.text }}</p>
        <div class="absolute bottom-0 left-0 overflow-hidden w-full">
            <div class="bg-purple-500 h-1 progress"></div>
        </div>
    </div>

</template>

<script setup>

const toast_data = useState('toast_data', () => null)
const nuxtApp = useNuxtApp()
let toast_timeout;

const closeToast = () => {
    clearTimeout(toast_timeout)
    toast_data.value = null
}


nuxtApp.provide('setToast', (data) => {
    toast_data.value = data
    toast_timeout = setTimeout(() => {

        toast_data.value = null
    }, 4000)
})
import ExclamationCircle from '~icons/heroicons/exclamation-circle-16-solid'
import XMark from '~icons/heroicons/x-mark-16-solid';
</script>

<style scoped>
@keyframes load {
    from {
        width: 0%;
    }

    to {
        width: 100%;
    }
}

.progress {
    animation: load 4s linear;
}
</style>