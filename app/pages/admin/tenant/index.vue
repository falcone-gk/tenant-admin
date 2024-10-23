<script setup lang="ts">
const { data, status } = useAPI<Tenant[]>(() => "/api/tenants", { lazy: true });
const loading = computed(() => status.value === "pending");

const selected = ref<Tenant[]>([]);
const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Nombre" },
  { key: "paymentDay", label: "Día de pago" },
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
