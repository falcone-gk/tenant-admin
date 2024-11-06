<script setup lang="ts">
import { format } from "date-fns";

const prevTenants = ref<Tenant[] | undefined>([]);
const { key: tenantKey } = useTenant();
const { data: tenants } = useNuxtData<Tenant[]>(tenantKey);

const prevRooms = ref<Room[] | undefined>([]);
const { key: roomKey } = useRoom();
const { data: rooms } = useNuxtData<Room[]>(roomKey);

const initialValues: FormDebt = {
  code: "",
  tenantId: null,
  roomId: null,
  date: format(new Date(), "yyyy-MM-dd"),
  rentCost: 0,
  prevElectricityRegister: 0,
  currentElectricityRegister: 0,
  monthElectricityConsume: 0,
  electricityCost: "0.00",
  prevWaterRegister: 0,
  currentWaterRegister: 0,
  monthWaterConsume: 0,
  waterCost: "0.00",
  tvCost: 0,
  internetCost: 0,
  amount: "0.00",
  totalPaid: "0.00",
};

const state = ref<FormDebt>({ ...initialValues });

const { data, status, error, execute: createDebt } = await useAPI("/api/debts", {
  immediate: false,
  watch: false,
  method: "POST",
  body: state,
  // Optimal update in tenant and room list cached
  onRequest: () => {
    prevTenants.value = tenants.value;
    prevRooms.value = rooms.value;

    if (tenants.value) {
      tenants.value = tenants.value.map((tenant) => {
        if (tenant.id === state.value.tenantId) {
          return {
            ...tenant,
            debCounter: tenant.debtCounter + 1,
          };
        }
        else {
          return tenant;
        }
      });
    }

    if (rooms.value) {
      rooms.value = rooms.value.map((room) => {
        if (room.id === state.value.tenantId) {
          return {
            ...room,
            electricityRegister: state.value.currentElectricityRegister,
            waterRegister: state.value.currentWaterRegister,
          };
        }
        else {
          return room;
        }
      });
    }
  },
  onRequestError: () => {
    tenants.value = prevTenants.value;
    rooms.value = prevRooms.value;
  },
  async onResponse() {
    await refreshNuxtData("tenants");
    await refreshNuxtData("rooms");
  },
});
const loading = computed(() => status.value === "pending");

const { showNotification } = useNotification();
const onCreateDebt = async () => {
  await createDebt();
  if (!data.value) {
    showNotification({
      type: "error",
      message: error.value ? error.value.data.message : "Error creating debt",
    });
  }
  else {
    showNotification({
      type: "success",
      message: "Debt created successfully",
    });
    state.value = initialValues;
  }
};
</script>

<template>
  <div class="p-4">
    <FormDebt v-model:form="state" :is-loading="loading" @send-form="onCreateDebt" />
  </div>
</template>
