// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/global.css'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
