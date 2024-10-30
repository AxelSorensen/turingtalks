// https://nuxt.com/docs/api/configuration/nuxt-config

import Icons from 'unplugin-icons/vite'

export default defineNuxtConfig({
  ssr: true,
  // routeRules: {
  //   '/': { isr: true },
  //   '/about': { isr: true },
  //   '/episodes': { isr: true },
  //   // '/episodes/**': { isr: true },
  //   // '/seasons/**': { isr: true },
  // },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  animation: {
    'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
  },
  keyframes: {
    'shake': {
      '10%, 90%': {
        transform: 'translate3d(-1px, 0, 0)'
      },
      '20%, 80%': {
        transform: 'translate3d(2px, 0, 0)'
      },
      '30%, 50%, 70%': {
        transform: 'translate3d(-4px, 0, 0)'
      },
      '40%, 60%': {
        transform: 'translate3d(4px, 0, 0)'
      }
    }
  },
  app: {
    head: {
      script: [
        {
          defer: true,
          src: "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js",
          "data-name": "BMC-Widget",
          "data-cfasync": "false",
          "data-id": "theturingtalks",
          "data-color": "#5F7FFF",
          "data-position": "right",
          "data-x_margin": "18",
          "data-y_margin": "18",
        }
      ],
    }
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
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
    auth: {
      enabled: true,
      persistence: ['indexedDBLocal']



    },


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
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: ['nuxt-vuefire'],

})