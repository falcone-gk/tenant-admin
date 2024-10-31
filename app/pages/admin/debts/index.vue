<script lang="ts" setup>
const rowInitialState: TableDebt = {
  code: "",
  tenantId: 0,
  roomId: 0,
  date: new Date().getTime(),
  isExtraDebt: false,
  rentCost: 0,
  prevElectricityRegister: 0,
  currentElectricityRegister: 0,
  electricityCost: 0,
  prevWaterRegister: 0,
  currentWaterRegister: 0,
  waterCost: 0,
  tvCost: 0,
  internetCost: 0,
  amount: 0,
  totalPaid: 0,
  isPaid: false,
  isEdit: true,
};

const rows = ref<TableDebt[]>([]);

const selected = ref<TableDebt[]>([]);
const columns = [
  { key: "actions", label: "Acciones" },
  { key: "code", label: "Código" },
  { key: "tenantId", label: "ID del inquilino" },
  { key: "roomId", label: "ID de la habitación" },
  { key: "date", label: "Fecha" },
  { key: "isExtraDebt", label: "¿Es deuda adicional?" },
  { key: "rentCost", label: "Costo de renta" },
  { key: "prevElectricityRegister", label: "Registro anterior de electricidad" },
  { key: "currentElectricityRegister", label: "Registro actual de electricidad" },
  { key: "electricityCost", label: "Costo de electricidad" },
  { key: "prevWaterRegister", label: "Registro anterior de agua" },
  { key: "currentWaterRegister", label: "Registro actual de agua" },
  { key: "waterCost", label: "Costo de agua" },
  { key: "tvCost", label: "TV" },
  { key: "internetCost", label: "Internet" },
  { key: "amount", label: "Total Costo" },
  { key: "totalPaid", label: "Total pagado" },
  { key: "isPaid", label: "¿Está pagado?" },
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
      :rows="rows"
      :columns="columns"
      :ui="{
        wrapper: 'md:max-w-[calc(100vw-var(--sidebar-width))]',
        base: 'max-w-full',
      }"
    >
      <template #actions-data="{ row }">
        <div>
          <UTooltip text="Editar">
            <UButton
              :padded="false"
              size="xs"
              variant="link"
              icon="i-heroicons-pencil-solid"
              color="gray"
              :to="`/admin/tenants/${row.id}`"
            />
          </UTooltip>
        </div>
      </template>

      <template #date-data="{ row }">
        {{ new Date(row.date).toLocaleDateString() }}
      </template>
      <template #currentElectricityRegister-data="{ row }">
        {{ `${row.currentElectricityRegister} kw` }}
      </template>

      <template #currentWaterRegister-data="{ row }">
        {{ `${row.currentWaterRegister} m3` }}
      </template>
    </UTable>
  </div>
</template>
