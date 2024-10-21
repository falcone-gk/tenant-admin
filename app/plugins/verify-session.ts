export default defineNuxtPlugin({
  name: "verify-session",
  parallel: true,
  async setup(nuxtApp) {
    const { data: session } = await useFetch("/api/auth/verify");
    const { setSession } = useAuth();

    if (session.value && session.value.isSigned) {
      setSession(session.value.data);
    }
  },
});
