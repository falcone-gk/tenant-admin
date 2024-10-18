// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["falconex-starter"],
  modules: ["@nuxt/eslint"],
  devtools: { enabled: true },
  colorMode: {
    preference: "light",
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-04-03",
  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: "double",
      },
    },
  },
});
