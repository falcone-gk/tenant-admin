<script setup lang="ts">
const title = useState("title");
const route = useRoute();
const currentRouteNameStructure = computed(() => {
  return route.path.split("/");
});
const backLink = computed(() => {
  return route.path.replace("/add", "");
});
</script>

<template>
  <div class="min-h-screen flex">
    <CommonSidebar />
    <div class="flex w-full">
      <div class="w-full">
        <div
          class="flex items-center justify-between px-4 h-[var(--header-height)] border-b-[1px] dark:border-b-gray-800"
        >
          <Typography tag="h1" variant="h2">
            {{ title }}
          </Typography>

          <div v-if="currentRouteNameStructure.includes('admin') && !currentRouteNameStructure.includes('add')">
            <UButton icon="i-heroicons-plus-circle-20-solid" :to="`${route.path}/add`">
              Agregar {{ title }}
            </UButton>
          </div>
          <div v-else>
            <UButton icon="i-heroicons-arrow-long-left-20-solid" :to="backLink">
              Regresar
            </UButton>
          </div>
        </div>
        <div
          class="flex flex-col overflow-y-scroll min-h-[calc(100vh-var(--header-height))]"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
