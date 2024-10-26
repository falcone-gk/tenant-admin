import type { UseFetchOptions } from "nuxt/app";

export function useAPI<ResT, DataT>(
  url: string | (() => string),
  options?: UseFetchOptions<ResT, DataT>,
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api,
  });
}
