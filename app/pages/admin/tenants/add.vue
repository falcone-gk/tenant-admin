<script setup lang="ts">
const initialValues = {
  name: "",
  paymentDay: 1,
  debtPrefix: "",
};
const state = ref<FormTenant>({ ...initialValues });

const { data, status, error, execute: createTenant } = await useAPI("/api/tenants", {
  immediate: false,
  watch: false,
  method: "POST",
  body: state,
});
const loading = computed(() => status.value === "pending");

const { showNotification } = useNotification();
const onCreateTenant = async () => {
  await createTenant();
  if (!data.value) {
    showNotification({
      type: "error",
      message: error.value ? error.value.data.message : "Error creating tenant",
    });
  }
  else {
    showNotification({
      type: "success",
      message: "Tenant created successfully",
    });
    state.value = initialValues;
  }
};
</script>

<template>
  <div class="p-4">
    <FormTenant v-model:form="state" :is-loading="loading" @send-form="onCreateTenant" />
  </div>
</template>
