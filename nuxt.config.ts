// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["falconex-starter"],
  modules: ["@nuxt/eslint"],
  $development: {
    runtimeConfig: {
      isDev: true,
    },
  },
  $production: {
    runtimeConfig: {
      isDev: false,
    },
  },
  devtools: { enabled: true },
  colorMode: {
    preference: "light",
  },
  runtimeConfig: {
    drizzle: {
      database_url: process.env.DATABASE_URL,
    },
    basicAuth: {
      saltRounds: process.env.SALT_ROUNDS,
      secretKey: process.env.SECRET_KEY,
    },
  },
  routeRules: {
    "/admin": {
      redirect: "/admin/tenant",
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-04-03",
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: "double",
      },
    },
  },
  tailwindcss: {
    cssPath: "~/assets/global.css",
  },
});
