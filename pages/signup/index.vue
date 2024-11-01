<template>
    <div class="w-full p-8 flex flex-col">
        <div class="flex justify-center items-center flex-col ">
            <p class="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Create a new account
            </p>
            <p class="mt-2 text-sm w-[30ch] text-center leading-4 text-slate-600">
                Create an account in order to like, comment and suggest topics


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
                    src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" class="h-[18px] w-[18px] ">
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

        <label for="name" class="sr-only">Name</label>
        <input v-model="data.name" name="name" type="text"
            class="block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="Username">
        <label for="email" class="sr-only">Email address</label>
        <input v-model="data.email" name="email" type="email" autocomplete="email"
            class="block w-full mt-2 rounded-lg border border-gray-300 px-3 py-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="Email Address">
        <label for="password" class="sr-only">Password</label>
        <input v-model="data.password" name="password" type="password" autocomplete="current-password"
            class="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="Password">
        <label for="password" class="sr-only">Password</label>
        <input v-model="data.repeat_password" name="password" type="password" autocomplete="current-password"
            class="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="Repeat Password">
        <p class="text-sm pt-2 text-red-500"> {{ error.name || error.email || error.password }}</p>
        <p class="mb-3 mt-2 text-sm text-gray-500">
            <!-- <a href="/forgot-password" class="text-blue-800 hover:text-blue-600">Reset your
                        password?</a> -->
        </p>
        <button @click="signUpEmail" type="submit"
            class="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
            Create account
        </button>
    </div>
</template>


<script setup>
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore';
const user = useCookie('user')


const auth = getAuth();
const db = useFirestore();
const data = ref({
    name: '',
    email: '',
    password: '',
    repeat_password: ''
})

const error = ref({
    email: null,
    password: null,
    name: null
})

function signIn(type) {
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
                //console.log(cred);
                const user_data = {
                    username: cred.user.displayName,
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
            navigateTo('/')



        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                const { $setToast } = useNuxtApp()
                $setToast({ title: 'User warning', text: `Account already exists with same email but different provider  ` })
            }
        });


}



const signUpEmail = () => {
    error.value.email = null
    error.value.password = null
    error.value.name = null

    if (!data.value.email) {
        error.value.email = "Please enter an email"
    } else if (!data.value.email.includes('@')) {
        error.value.email = "Please enter a valid email"
    }

    if (!data.value.password) {
        error.value.password = "Please enter a password"
    } else if (data.value.password.length < 6) {
        error.value.password = "Password must be at least 6 characters"
    }

    if (data.value.password !== data.value.repeat_password) {
        error.value.password = "Passwords don't match"
        return
    }

    if (!data.value.name) {
        error.value.name = "Please enter a name"
    }

    if (error.value.email || error.value.password || error.value.name) {
        return
    }

    //console.log('creating account')
    createUserWithEmailAndPassword(auth, data.value.email, data.value.password)
        .then(async (cred) => {
            // Signed in 
            if (cred.user.metadata.creationTime === cred.user.metadata.lastSignInTime) {
                //console.log(cred);

                const user_data = {
                    username: data.value.name,
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
                navigateTo('/')
                return setDoc(doc(collection(db, 'users'), cred?.user?.uid), user_data);

            }
            getDoc(doc(db, 'users', cred?.user?.uid)).then(doc => {
                if (doc.exists()) {

                    user.value = doc.data();
                }
            })

            navigateTo('/')

            // ...
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                const { $setToast } = useNuxtApp()
                $setToast({ title: 'User warning', text: `Account already exists with same email but different provider  ` })
            }

            //console.log("Error signing up: ", error);
        });


}

</script>

<style scoped></style>