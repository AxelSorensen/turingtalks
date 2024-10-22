import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'


export default defineNuxtPlugin(() => {

    const firebaseConfig = {
        apiKey: "AIzaSyCWXYg1Y8-64XhePLPxbuvY0SkFRJye02Y",
        authDomain: "theturingtalks.firebaseapp.com",
        projectId: "theturingtalks",
        storageBucket: "theturingtalks.appspot.com",
        messagingSenderId: "337127847092",
        appId: "1:337127847092:web:a6f39e2125b8ba969dd3e1",
        measurementId: "G-P9FPDM46KR"
    };

    const app = initializeApp(firebaseConfig)

    const auth = getAuth(app)
    const db = getFirestore(app)
    return {
        provide: {
            auth,
            db
        }
    }
})