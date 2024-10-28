import type { UseFetchOptions } from "nuxt/app";

export function useRoom() {
  const url = "/api/rooms";
  const nuxtApp = useNuxtApp();
  const key = "rooms";

  function getRooms<T = Room[]>(
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

  async function getRoomOptions() {
    const { data: rooms } = await getRooms();
    if (!rooms.value) return [];
    return rooms.value.map((room) => {
      return {
        id: room.id,
        code: room.code,
        tenantId: room.tenantId,
      };
    });
  }

  return {
    getRooms,
    getRoomOptions,
  };
};
