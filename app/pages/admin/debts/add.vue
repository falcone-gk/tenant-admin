<script setup lang="ts">
import { format } from "date-fns";

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

const { data, status, execute: createDebt } = await useAPI("/api/debts", {
  immediate: false,
  watch: false,
  method: "POST",
  body: state,
});
const loading = computed(() => status.value === "pending");

const { showNotification } = useNotification();
const onCreateDebt = async () => {
  await createDebt();
  if (!data.value) {
    showNotification({
      type: "error",
      message: "Error creating debt",
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
