export const useAuth = () => {
  const userSession = useState<UserSession | null>("userSession", () => null);
  const isLoggedIn = ref(Boolean(userSession.value));

  const initialStateBody = {
    username: "",
    password: "",
  };
  const body = ref(initialStateBody);
  const { data: session, execute: signin } = useFetch("/api/auth/login", {
    immediate: false,
    watch: false,
    method: "POST",
    body: body,
  });

  const { execute: onLogout } = useFetch("/api/auth/logout", {
    immediate: false,
    watch: false,
    method: "POST",
  });

  function setSession(session: UserSession) {
    userSession.value = session;
    isLoggedIn.value = true;
  }

  function deleteSession() {
    userSession.value = null;
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
    userSession,
    isLoggedIn,
    login,
    logout,
    setSession,
    deleteSession,
  };
};
