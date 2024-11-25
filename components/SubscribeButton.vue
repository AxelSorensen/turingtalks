<template>
    <button v-if="!user.subscribed"
        class="hover:brightness-110 bg-purple-500 group items-center text-white  gap-2 justify-center flex text-sm  rounded-md p-1 px-2"
        @click="subscribeUser">
        <Bell v-if="bell" class="" />
        <p>Subscribe</p>
    </button>
    <button v-else
        class="hover:bg-purple-500 hover:bg-opacity-20 group items-center text-purple-500  gap-2 justify-center ring-[1px] ring-purple-500  flex text-sm  rounded-md p-1 px-2"
        @click="unsubscribeUser">
        <Bell v-if="bell" class="" />
        <span>Unsubscribe</span>
    </button>
</template>

<script setup>


defineProps({
    bell: Boolean
})
import { doc, updateDoc } from 'firebase/firestore';
import Bell from '~icons/heroicons/bell-16-solid';
const db = useFirestore();
const user = useCookie('user');
const show_subscribe_modal = useState('show_subscribe_modal');
const show_unsubscribe_modal = useState('show_unsubscribe_modal');

const subscribeUser = async () => {
    show_subscribe_modal.value = true;
}

const unsubscribeUser = async () => {
    show_unsubscribe_modal.value = true;
}



</script>

<style lang="scss" scoped></style>