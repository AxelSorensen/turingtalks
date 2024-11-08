// https://nuxt.com/docs/api/configuration/nuxt-config

import Icons from 'unplugin-icons/vite'

export default defineNuxtConfig({
  routeRules: {
    // '/': { isr: true },
    // '/about': { isr: true },
    // '/suggestions': { isr: true },
    // '/episodes': { isr: true },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      meta: [
        {
          name: "google-site-verification",
          content: `zc8kCUB74Q5lDurotw0XrP-MfvQogM1NvHi0bKQlmIc`,
        },
        {
          property: "og:image",
          content: "/og_preview.png",
        },
        {
          property: "og:url",
          content: "https://www.theturingtalks.com/",
        }

      ],
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
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
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
  modules: ['nuxt-vuefire', "@nuxt/image"],

})