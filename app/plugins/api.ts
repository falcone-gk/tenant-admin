export default defineNuxtPlugin({
  name: "api",
  dependsOn: ["verify-session"],
  async setup(nuxtApp) {
    const api = $fetch.create({
      async onResponseError({ response }) {
        if (response.status === 401) {
          await nuxtApp.runWithContext(() => navigateTo("/login"));
        }
      },
    });

    // Expose to useNuxtApp().$api
    return {
      provide: {
        api,
      },
    };
  },
});
