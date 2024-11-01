<template>
    <div class="w-full max-w-[500px] mx-auto items-center flex flex-col gap-2">
        <div class="flex items-center">
            <h2 class="text-stone-900 text-xl whitespace-nowrap truncate p-2">Subscribe to stay notified</h2>
            <Bell class="text-stone-900 text-lg" />
        </div>
        <div class="flex w-full flex-col gap-2" v-if="!user">
            <input v-model="data.name"
                class="w-full outline-stone-700 p-2 max-w-[500px] mx-auto text-stone-900 placeholder-stone-400 rounded-md bg-white"
                type="text" placeholder="Your name">
            <input v-model="data.email"
                class="w-full outline-stone-700 p-2 max-w-[500px] mx-auto text-stone-900 placeholder-stone-400 rounded-md bg-white"
                type="text" placeholder="Your email">
            <div class="h-12">
                <button v-if="status == 'idle'"
                    class="p-2 w-full bg-stone-900 h-10 text-white hover:bg-opacity-90 rounded-md"
                    @click="subscribe">Subscribe</button>
                <div class="w-full bg-stone-900 h-10 rounded-md" v-else-if="status == 'pending'">
                    <Spinner class="mx-auto bg-stone-900 scale-[70%]" />
                </div>
                <p class=" bg-stone-900 h-10 flex justify-center items-center text-white rounded-md text-center"
                    v-else-if="status == 'success'">Thank
                    you
                    for
                    subscribing!
                </p>

            </div>
        </div>
        <div v-else>
            <SubscribeButton :bell="false" class="mt-2 w-[220px] scale-[120%]" />
        </div>
    </div>
</template>

<script setup>
const user = useCookie('user')
const status = ref('idle')
import Bell from '~icons/heroicons/bell-16-solid'
import { collection, addDoc } from 'firebase/firestore';
const db = useFirestore()
const subscribe = async () => {
    status.value = 'pending'
    const subscribers_ref = collection(db, 'subscribers')
    await addDoc(subscribers_ref, data.value)
    status.value = 'success'
    data.value = {
        name: '',
        email: ''
    }
    setTimeout(() => {
        status.value = 'idle'
    }, 2000)
}

const data = ref({
    name: '',
    email: ''
})


</script>

<style lang="scss" scoped></style>