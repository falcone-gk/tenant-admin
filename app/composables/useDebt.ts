import type { UseFetchOptions } from "nuxt/app";

export function useDebt() {
  const url = "/api/debts";
  const nuxtApp = useNuxtApp();
  const key = "debts";

  function getDebts<T = Debt[]>(
    options?: UseFetchOptions<T>,
  ) {
    return useAPI(url, {
      ...options,
      key: key,
      getCachedData: () => {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      },
    });
  }

  async function getTenantLastDebt(tenantId: number) {
    const { data: debts } = await getDebts();
    if (!debts.value) return null;
    return debts.value.find(debt => debt.tenantId === tenantId);
  }

  return {
    getDebts,
  };
};
