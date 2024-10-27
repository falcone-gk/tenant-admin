import type { UseFetchOptions } from "nuxt/app";

export function useRoom() {
  const url = "/api/rooms";
  const nuxtApp = useNuxtApp();
  const key = "roomOptions";

  function getRooms<T = Room[], DataT = RoomOption[]>(
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

  function getRoomOptions() {
    return getRooms({
      transform: (data: Room[]) => {
        const tenantOpts = data.map((item) => {
          return {
            id: item.id,
            code: item.code,
            tenantId: item.tenantId,
          };
        });
        return tenantOpts;
      },
      $fetch: useNuxtApp().$api,
    });
  }

  return {
    getRooms,
    getRoomOptions,
  };
};
