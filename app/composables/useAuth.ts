export const useAuth = () => {
  const user = useState<UserSession | null>("user", () => null);
  const isLoggedIn = ref(Boolean(user.value));

  const initialStateBody = {
    username: "",
    password: "",
  };
  const body = ref(initialStateBody);
  const { data: session, status, execute: signin } = useFetch("/api/auth/login", {
    immediate: false,
    watch: false,
    method: "POST",
    body: body,
  });
  const pendingAuth = computed(() => status.value === "pending");

  const { execute: onLogout } = useFetch("/api/auth/logout", {
    immediate: false,
    watch: false,
    method: "POST",
  });

  function setSession(session: UserSession) {
    user.value = session;
    isLoggedIn.value = true;
  }

  function deleteSession() {
    user.value = null;
    isLoggedIn.value = false;
  }

  async function login(data: LoginSchemaType) {
    body.value = data;
    await signin();

    if (session.value) {
      setSession(session.value.data);
      body.value = initialStateBody;
    }
  }

  async function logout() {
    await onLogout();
    deleteSession();
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    pendingAuth,
    setSession,
    deleteSession,
  };
};
