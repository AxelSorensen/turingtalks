import { useFirestore } from 'vuefire'
import { getDoc, doc, setDoc } from 'firebase/firestore';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useCookie('user')

    if ((!user.value) && to.path == '/profile') {
        return navigateTo('/')
    }
})