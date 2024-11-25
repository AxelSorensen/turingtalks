<template>
    <nav ref="navbar"
        class="flex flex-col select-none sm:flex-row justify-between whitespace-nowrap bg-[#F8F7F2]/60 z-10 backdrop-blur-xl"
        :class="{ 'pb-4': nav_open }">
        <div @focusout="nav_open = false" class="flex justify-between items-center p-4">
            <NuxtLink class="flex items-center gap-2" to="/">
                <NuxtImg class="size-6" src="/logo.png" alt="" />
                <header class="font-medium text-lg sm:text-base">The Turing Talks</header>
            </NuxtLink>
            <div class="flex items-center gap-4">
                <NuxtLink
                    class="hover:bg-stone-700 -my-1 text-base sm:hidden bg-stone-900 rounded-md px-2 text-white p-1"
                    to="/episodes">
                    Listen now
                </NuxtLink>
                <div @click="nav_open = !nav_open"
                    class="text-stone-700 text-2xl w-8 -my-2 justify-center flex sm:hidden hover:text-stone-900 cursor-pointer">
                    <Menu v-if="!nav_open" />
                    <XMark class="" v-else />
                </div>
            </div>
        </div>

        <div :class="nav_open ? 'block' : 'hidden'"
            class="flex items-start flex-col text-stone-500 sm:gap-2 gap-4 sm:flex-row justify-center sm:items-center px-4 py-2 sm:flex">

            <NuxtLink @click="nav_open = false" v-for="route in routes"
                class="text-base sm:text-sm nav-links text-stone-900 rounded-md p-1 px-2" :to="route.path"
                :key="route.name">
                {{ route.name }}
            </NuxtLink>
            <hr v-if="user" class="border-stone-400 sm:hidden mb-2 w-full ">
            </hr>

            <div class="text-2xl hidden sm:flex pb-1 leading-5 mx-2 font-thin">|</div>


            <div v-if="user" :class="[showProfileModal ? 'sm:bg-black sm:bg-opacity-10 rounded-md' : null]"
                ref="profileModal"
                class="relative rounded-md overflow-hidden  cursor-pointer flex h-8 -my-2 w-full justify-between px-2 items-center gap-2 mr-2">
                <div @click="showProfileModal = !showProfileModal" class="flex gap-2 items-center">
                    <NuxtImg v-if="user.img" :src="user.img" class="rounded-full w-7 h-7" alt="" />
                    <div v-else
                        class="rounded-full w-7 h-7 bg-black flex justify-center items-center text-white font-light">
                        {{
                            user?.username?.[0] }}
                    </div>
                    <div class="sm:text-sm sm:font-medium text-stone-900">
                        <p class="truncate max-w-fit">{{
                            user?.username?.split(' ').slice(0, 2).join(' ')
                        }}</p>
                    </div>
                </div>

                <SubscribeButton :bell="true" class="sm:hidden" />
            </div>

            <div v-else-if="!nav_open" class="h-8 -my-2 items-center  flex">
                <button @click="show_login_modal = true"
                    class="text-sm ml-2 mr-2 px-4 bg-stone-900 bg-opacity-100 text-white cursor-pointer p-1 rounded-md  hover:bg-stone-700">
                    Login
                </button>
            </div>
            <div class="flex flex-col sm:hidden w-full justify-end px-2 pt-2">
                <div v-if="user" class="flex w-full gap-1 flex-col">
                    <NuxtLink @click="showProfileModal = false; nav_open = false" v-for="option, id in options"
                        class="text-base  rounded-md py-1 sm:text-sm hover:bg-black hover:bg-opacity-10 text-stone-700 hover:text-stone-900"
                        :to="option.path" :key="option.name">

                        <div class="rounded-md flex items-center gap-2 py-1 w-full ">
                            <component :class="[id == 0 ? 'text-lg' : null]" :is="iconComponents[option.icon]"
                                class="text-stone-900" />
                            <div>{{ option.name }}</div>
                        </div>
                    </NuxtLink>
                </div>

                <button v-if="user" class="bg-stone-900 mt-4 hover:bg-opacity-90 text-white rounded-md p-2"
                    @click="signUserOut">Sign out</button>
                <button v-else @click="show_login_modal = true"
                    class=" p-2 bg-black text-white cursor-pointer rounded-md hover:bg-black hover:bg-opacity-90">
                    Login
                </button>
            </div>
        </div>


    </nav>

    <div class="sm:flex justify-end px-4 pt-2 hidden ">

        <div ref="profileModal" v-if="showProfileModal"
            class="flex shadow-xl mr-1 p-4 divide-y divide-stone-400 flex-col rounded-md bg-[#F8F7F2]/40 z-10 backdrop-blur-xl w-[14rem]">
            <NuxtLink @click="showProfileModal = false;" v-for="option in options"
                class="text-base sm:text-sm pb-2   text-stone-600 hover:text-stone-900" :to="option.path"
                :key="option.name">

                <div class="rounded-md items-center flex gap-2 py-2 pl-1 hover:bg-black hover:bg-opacity-5">
                    <component :class="[id == 0 ? 'text-lg' : null]" :is="iconComponents[option.icon]"
                        class="text-stone-900" />
                    <div>{{ option.name }}</div>
                </div>

            </NuxtLink>
            <div class="flex-col gap-2 pt-2 flex">

                <SubscribeButton :bell="true" class="mt-2" />
                <button class="bg-stone-900 hover:bg-stone-700 text-sm py-2 text-white rounded-md p-1"
                    @click="signUserOut">Sign out</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Bell from '~icons/heroicons/bell-16-solid';
import { getAuth, signOut } from 'firebase/auth';
import Profile from '~icons/heroicons/user-16-solid';
import Menu from '~icons/heroicons/bars-3-bottom-right-16-solid';
import XMark from '~icons/heroicons/x-mark-16-solid';
import { onClickOutside } from '@vueuse/core';
import Heart from '~icons/heroicons/heart-16-solid';
import Comment from '~icons/heroicons/chat-bubble-oval-left-ellipsis-16-solid';
import LightBulb from '~icons/heroicons/light-bulb-16-solid';
const show_login_modal = useState('show_login_modal')
const auth = getAuth()// only exists on client side
const db = useFirestore();
const nav_open = ref(false);
const showProfileModal = ref(false);


const navbar = ref(null);
const profileModal = ref(null);

onClickOutside(navbar, event => nav_open.value = false);

onClickOutside(profileModal, event => showProfileModal.value = false);

const routes = [
    { name: 'Episodes', path: '/episodes' },
    { name: 'Suggestions', path: '/suggestions' },
    { name: 'About', path: '/about' },
];

const options = [
    { name: 'My Page', path: `/profile`, icon: 'Profile' },

];

const iconComponents = {
    Profile,
    LightBulb,
    Comment,
};

const route = useRoute()

const user = useCookie('user');


function signUserOut() {
    showProfileModal.value = false;
    nav_open.value = false;
    user.value = null

    signOut(auth).then(() => {
        user.value = null
        //if route is /profile then navigate to /
        if (route.path === '/profile') {
            navigateTo('/')
        }


        // navigateTo('/')
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}
</script>

<style scoped>
.nav-links.router-link-exact-active {
    @apply underline underline-offset-8 text-stone-900 decoration-[1.5px] font-medium;
}
</style>
