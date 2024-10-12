// https://nuxt.com/docs/api/configuration/nuxt-config

import Icons from 'unplugin-icons/vite'

export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {

    plugins: [
      Icons({
        // the feature below is experimental ⬇️
        autoInstall: true
      })
    ]
  },
  vuefire: {
    config: {
      apiKey: "AIzaSyCWXYg1Y8-64XhePLPxbuvY0SkFRJye02Y",
      authDomain: "theturingtalks.firebaseapp.com",
      projectId: "theturingtalks",
      storageBucket: "theturingtalks.appspot.com",
      messagingSenderId: "337127847092",
      appId: "1:337127847092:web:a6f39e2125b8ba969dd3e1",
      measurementId: "G-P9FPDM46KR"
    }
  },


  css: ['~/global.css'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['nuxt-vuefire'],

})