export const useAuth = () => {
  const userSession = useState<UserSession | null>("userSession", () => null);
  const isLoggedIn = ref(Boolean(userSession.value));

  function setSession(session: UserSession) {
    userSession.value = session;
  }

  function deleteSession() {
    userSession.value = null;
  }

  return {
    userSession,
    isLoggedIn,
    setSession,
    deleteSession,
  };
};
