<script lang="ts" setup>
const { data: debts, status } = await useAPI<TableDebt[]>("/api/debts", { lazy: true });
const loading = computed(() => status.value === "pending");

const selected = ref<TableDebt[]>([]);
const columns = [
  { key: "actions", label: "Acciones" },
  { key: "code", label: "Código" },
  { key: "tenant.name", label: "ID del inquilino" },
  { key: "room.code", label: "ID de la habitación" },
  { key: "date", label: "Fecha" },
  { key: "isExtraDebt", label: "¿Es deuda adicional?" },
  { key: "rentCost", label: "Costo de renta" },
  { key: "prevElectricityRegister", label: "Registro anterior de electricidad" },
  { key: "currentElectricityRegister", label: "Registro actual de electricidad" },
  { key: "monthElectricityConsume", label: "Consumo del mes de luz" },
  { key: "electricityCost", label: "Costo de electricidad" },
  { key: "prevWaterRegister", label: "Registro anterior de agua" },
  { key: "currentWaterRegister", label: "Registro actual de agua" },
  { key: "monthWaterConsume", label: "Consumo del mes del agua" },
  { key: "waterCost", label: "Costo de agua" },
  { key: "tvCost", label: "TV" },
  { key: "internetCost", label: "Internet" },
  { key: "amount", label: "Costo total" },
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
      :loading="loading"
      :rows="debts"
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

      <template #prevElectricityRegister-data="{ row }">
        {{ `${row.prevElectricityRegister} kw` }}
      </template>
      <template #currentElectricityRegister-data="{ row }">
        {{ `${row.currentElectricityRegister} kw` }}
      </template>
      <template #monthElectricityConsume-data="{ row }">
        {{ `${row.monthElectricityConsume} kw` }}
      </template>
      <template #waterCost-data="{ row }">
        {{ `S/ ${row.waterCost}` }}
      </template>

      <template #prevWaterRegister-data="{ row }">
        {{ `${row.prevWaterRegister} m3` }}
      </template>
      <template #currentWaterRegister-data="{ row }">
        {{ `${row.currentWaterRegister} m3` }}
      </template>
      <template #monthWaterConsume-data="{ row }">
        {{ `${row.monthWaterConsume} m3` }}
      </template>
      <template #electricityCost-data="{ row }">
        {{ `S/ ${row.electricityCost}` }}
      </template>

      <template #internetCost-data="{ row }">
        {{ `S/ ${row.internetCost}` }}
      </template>
      <template #tvCost-data="{ row }">
        {{ `S/ ${row.tvCost}` }}
      </template>

      <template #amount-data="{ row }">
        {{ `S/ ${row.amount}` }}
      </template>
      <template #totalPaid-data="{ row }">
        {{ `S/ ${row.totalPaid}` }}
      </template>
    </UTable>
  </div>
</template>
