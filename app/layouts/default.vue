<script setup lang="ts">
const title = useState("title");
</script>

<template>
  <div class="min-h-screen flex">
    <CommonSidebar />
    <div class="flex w-full">
      <div class="w-full">
        <div
          class="flex items-center px-4 h-[var(--header-height)] border-b-[1px] dark:border-b-gray-800"
        >
          <Typography tag="h1" variant="h2">
            {{ title }}
          </Typography>
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
