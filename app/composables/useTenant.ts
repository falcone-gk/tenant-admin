import type { UseFetchOptions } from "nuxt/app";

export function useTenant() {
  const url = "/api/tenants";
  const nuxtApp = useNuxtApp();
  const key = "tenants";

  function getTenants<T = Tenant[]>(
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

  async function getTenantOptions() {
    const { data: tenants } = await getTenants();
    if (!tenants.value) return [];
    return tenants.value.map((tenant) => {
      return {
        id: tenant.id,
        name: tenant.name,
      };
    });
  }

  return {
    getTenants,
    getTenantOptions,
  };
}
