<template>


    <div class="relative max-w-[600px] h-fit mt-20 w-[80%] bg-white rounded-lg shadow">
        <button type="button" @click="show_login_modal = false"
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
                    Login to your account
                </p>
                <p class="mt-2 text-sm w-[30ch] text-center leading-4 text-slate-600">
                    You must be logged in to like, comment and suggest topics


                </p>
            </div>

            <div class="mt-7 flex flex-col gap-2">



                <button @click="signIn('google')"
                    class="inline-flex hover:bg-stone-100 h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                        src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                        class="h-[18px] w-[18px] ">Continue with
                    Google
                </button>
                <button @click="signIn('github')"
                    class="inline-flex hover:bg-stone-100 h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                        src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub"
                        class="h-[18px] w-[18px] ">
                    Continue with GitHub
                </button>


                <!-- <button
                    class="inline-flex hover:bg-stone-100 h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                        src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="Google"
                        class="h-[18px] w-[18px] ">Continue with
                    LinkedIn
                </button> -->
            </div>

            <div class="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                <div class="h-px w-full bg-slate-200"></div>
                OR
                <div class="h-px w-full bg-slate-200"></div>
            </div>


            <div class="w-full">
                <label for="email" class="sr-only">Email address</label>
                <input @focus="error_sign_in = null" v-model="sign_in_data.email" name="email" type="email"
                    autocomplete="email" required=""
                    class="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Email Address">
                <label for="password" class="sr-only">Password</label>
                <input @focus="error_sign_in = null" v-model="sign_in_data.password" name="password" type="password"
                    autocomplete="current-password" required=""
                    class="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Password">
                <p class="text-sm pt-2 text-red-500"> {{ error_sign_in }}</p>

                <p class="mb-3 mt-2 text-sm text-gray-500">
                    <!-- <a href="/forgot-password" class="text-blue-800 hover:text-blue-600">Reset your
                        password?</a> -->
                </p>
                <button @click="signInEmail" type="submit"
                    class="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
                    Continue
                </button>
            </div>


            <div class="mt-6 text-center text-sm text-slate-600">
                Don't have an account?
                <div @click="show_login_modal = false">
                    <NuxtLink to="/signup" class="font-medium cursor-pointer text-[#4285f4]">Sign up</NuxtLink>
                </div>
            </div>
        </div>
    </div>



</template>

<script setup>
import { signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { setDoc, collection, doc, getDoc } from 'firebase/firestore';
const show_login_modal = useState('show_login_modal')
const auth = getAuth()// only exists on client side
const db = useFirestore();

const user = useCookie('user')
const data = ref({
    email: '',
    password: '',
    repeat_password: ''
})

const sign_in_data = ref({
    email: '',
    password: ''
})

const error = ref({
    email: null,
    password: null
})

const error_sign_in = ref(null)

const page = ref('login')

function signIn(type) {
    show_login_modal.value = false;
    let provider
    if (type === 'google') {
        provider = new GoogleAuthProvider();
    }
    if (type === 'github') {
        provider = new GithubAuthProvider();
    }
    signInWithPopup(auth, provider)
        .then(async (cred) => {
            if (cred.user.metadata.creationTime === cred.user.metadata.lastSignInTime) {
                //console.log("New user");
                const user_data = {
                    username: cred.user.displayName || cred.user.reloadUserInfo.screenName,
                    email: cred.user.email,
                    img: cred.user.photoURL,
                    likes: [],
                    upvoted: [],
                    suggestions: [],
                    uid: cred?.user?.uid,
                    last_commented: null,
                    last_suggested: null,
                    comments_today: null,
                    subscribed: false,
                }
                user.value = user_data;
                return setDoc(doc(collection(db, 'users'), cred?.user?.uid), user_data);

            }
            getDoc(doc(db, 'users', cred?.user?.uid)).then(doc => {
                if (doc.exists()) {

                    user.value = doc.data();
                }
            })

        })
        .catch(error => {
            console.log("Error signing in: ", error);
            if (error.code === 'auth/account-exists-with-different-credential') {
                const { $setToast } = useNuxtApp()
                $setToast({ title: 'User warning', text: `Account already exists with same email but different provider  ` })
            }
        });


}

const signInEmail = () => {
    if (!sign_in_data.value.email || !sign_in_data.value.password) {
        error_sign_in.value = "Please fill out empty fields"
        return
    }

    signInWithEmailAndPassword(auth, sign_in_data.value.email, sign_in_data.value.password)
        .then(async (cred) => {
            show_login_modal.value = false;
            // Signed in
            getDoc(doc(db, 'users', cred?.user?.uid)).then(doc => {
                if (doc.exists()) {

                    user.value = doc.data();
                }
            })
            sign_in_data.value = {
                email: '',
                password: ''
            }



            // ...
        })
        .catch((error) => {
            error_sign_in.value = "User doesn't exist"
        });
}



</script>

<style lang="scss" scoped></style>