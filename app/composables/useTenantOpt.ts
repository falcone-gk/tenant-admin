import type { UseFetchOptions } from "nuxt/app";

export function useTenant() {
  const url = "/api/tenants";
  const nuxtApp = useNuxtApp();
  const key = "tenantOptions";

  function getTenants<T = Tenant[], DataT = TenantOption[]>(
    options?: UseFetchOptions<T, DataT>,
  ) {
    return useAPI(url, {
      ...options,
      key: key,
      getCachedData: () => {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      },
      $fetch: useNuxtApp().$api,
    });
  }

  function getTenantOptions() {
    return getTenants({
      transform: (data: Tenant[]) => {
        const tenantOpts = data.map((item) => {
          return {
            id: item.id,
            name: item.name,
          };
        });
        return tenantOpts;
      },
      $fetch: useNuxtApp().$api,
    });
  }

  return {
    getTenants,
    getTenantOptions,
  };
}
