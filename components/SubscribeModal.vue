<template>


    <div class="relative max-w-[600px] h-fit m-auto w-[80%] bg-white rounded-lg shadow">
        <button type="button" @click="show_subscribe_modal = false"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-stone-100 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"><svg
                aria-hidden="true" class="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    cliprule="evenodd"></path>
            </svg>
            <span class="sr-only">Close popup</span>
        </button>

        <div class="p-5">
            <h3 class="text-2xl mb-0.5 font-medium"></h3>
            <p class="mb-4 text-sm font-normal text-gray-800"></p>

            <div class="flex justify-center items-center flex-col ">
                <p class="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                    Subscribe to be notified
                </p>
                <p class="mt-2 text-sm w-[30ch] text-center leading-4 text-slate-600">
                    Subscribe to be notified by email when new episodes are aviailable
                </p>
            </div>

            <div v-if="!user" class="mt-7 flex flex-col gap-2">

                <button
                    class="inline-flex hover:bg-stone-100 h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                        src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub"
                        class="h-[18px] w-[18px] ">
                    Continue with GitHub
                </button>

                <button @click="signInGoogle"
                    class="inline-flex hover:bg-stone-100 h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                        src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                        class="h-[18px] w-[18px] ">Continue with
                    Google
                </button>


                <!-- <button
                    class="inline-flex hover:bg-stone-100 h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                        src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="Google"
                        class="h-[18px] w-[18px] ">Continue with
                    LinkedIn
                </button> -->
            </div>
            <div v-else class="flex flex-col items-center mt-4 justify-center">
            </div>



            <div class="flex flex-col">
                <label class="sr-only">Password</label>
                <input :value="user?.username" name="text" type="text" autocomplete="current-password" required=""
                    class="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Name" value="">
                <label for="email" class="sr-only">Email address</label>
                <input :value="user.email" name="email" type="email" autocomplete="email" required=""
                    class="block w-full rounded-lg border mt-2 border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Email Address" value="">

                <p class="mb-3 mt-2 text-sm text-gray-500">
                    <!-- <a href="/forgot-password" class="text-blue-800 hover:text-blue-600">Reset your
                        password?</a> -->
                </p>
                <div class="flex justify-center text-sm items-center h-12 flex-col">


                    <Spinner v-if="status == 'pending'" class="scale-[70%]" />


                    <div class="items-center w-full py-3 gap-2 justify-center  flex text-green-700 p-2 rounded-md bg-green-100"
                        v-else-if="status == 'success'">
                        <span>You
                            have been
                            subscribed</span>
                        <CheckMark />
                    </div>

                    <button v-else @click="subscribeUser"
                        class="flex w-full hover:bg-stone-700 items-center justify-center rounded-lg bg-stone-900 p-2 py-3 font-medium text-white outline-none disabled:bg-gray-400">
                        <span>Subscribe</span>


                    </button>

                </div>
            </div>

            <!-- <div class="mt-6 text-center text-sm text-slate-600">
                Don't have an account?
                <a href="/signup" class="font-medium text-[#4285f4]">Sign up</a>
            </div> -->
        </div>
    </div>



</template>

<script setup>
import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { setDoc, collection, addDoc, doc, updateDoc } from 'firebase/firestore';
const show_subscribe_modal = useState('show_subscribe_modal')
import CheckMark from '~icons/heroicons/check-16-solid';
const auth = getAuth()// only exists on client side
const db = useFirestore();
const user = useCookie('user')
const status = ref('idle')
const subscribeUser = async () => {
    status.value = 'pending'
    const userRef = doc(db, 'users', user.value.uid);
    //updaet doc
    await updateDoc(userRef, {
        subscribed: true
    });
    const subscribers_ref = doc(db, 'subscribers', user.value.uid)
    await setDoc(subscribers_ref, { email: user.value.email, name: user.value.username })

    user.value.subscribed = true;
    status.value = 'success'
    setTimeout(() => {
        show_subscribe_modal.value = false;
    }, 1000)
}


</script>

<style lang="scss" scoped></style>