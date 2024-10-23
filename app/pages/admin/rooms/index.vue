<script setup lang="ts">
const { data, status } = useAPI<Room[]>(() => "/api/rooms", { lazy: true });
const loading = computed(() => status.value === "pending");

const selected = ref<Room[]>([]);
const columns = [
  { key: "code", label: "Código" },
  { key: "tenants.name", label: "Inquilino" },
  { key: "rent", label: "Alquiler" },
  { key: "electricityTypeRegister", label: "Tipo de registro de electricidad" },
  { key: "electricityRegister", label: "Registro de luz" },
  { key: "waterTypeRegister", label: "Tipo de registro de agua" },
  { key: "waterRegister", label: "Registro de agua" },
  { key: "hasTV", label: "Tiene TV" },
  { key: "tvCost", label: "Costo de TV" },
  { key: "hasInternet", label: "Tiene Internet" },
  { key: "internetCost", label: "Costo de Internet" },
];
</script>

<template>
  <div>
    <div class="flex justify-end p-2">
      <UButton icon="i-heroicons-trash-solid" color="red" :disabled="selected.length === 0">
        Eliminar
      </UButton>
    </div>
    <UTable
      v-model="selected"
      class="border-y-2"
      :loading="loading"
      :rows="data"
      :columns="columns"
    />
  </div>
</template>
