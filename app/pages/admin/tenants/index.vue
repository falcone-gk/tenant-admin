<script setup lang="ts">
interface Room {
  code: string;
}

const { data, status } = useAPI<TableTenant[]>(() => "/api/tenants", { lazy: true });
const loading = computed(() => status.value === "pending");

const selected = ref<Tenant[]>([]);
const selectedIds = computed(() => selected.value.map(tenant => tenant.id));
const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Nombre" },
  { key: "paymentDay", label: "Día de pago" },
  { key: "rooms", label: "Cuartos" },
  { key: "actions", label: "Acciones" },
];

const { status: deleteStatus, execute: deleteTenants } = useAPI("/api/tenants/delete", {
  immediate: false,
  watch: false,
  method: "POST",
  body: {
    ids: selectedIds,
  },
});
</script>

<template>
  <div>
    <div class="flex justify-end p-2">
      <UButton
        icon="i-heroicons-trash-solid"
        color="red"
        :disabled="selected.length === 0"
        :loading="deleteStatus === 'pending'"
        @click="deleteTenants"
      >
        Eliminar
      </UButton>
    </div>
    <UTable
      v-model="selected"
      class="border-y-2"
      :loading="loading"
      :rows="data"
      :columns="columns"
    >
      <template #rooms-data="{ row }">
        {{ row.rooms.map((room: Room) => room.code).join(",") }}
      </template>
      <template #actions-data="{ row }">
        <UTooltip text="Editar">
          <UButton
            size="xs"
            icon="i-heroicons-pencil-solid"
            color="gray"
            :to="`/admin/tenants/${row.id}`"
          />
        </UTooltip>
      </template>
    </UTable>
  </div>
</template>
