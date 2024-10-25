<script setup lang="ts">
const initialValues: FormRoom = {
  code: "",
  tenantId: null,
  rent: 0,
  electricityTypeRegister: "fixed",
  electricityRegister: 0,
  waterTypeRegister: "fixed",
  waterRegister: 0,
  hasTV: false,
  tvCost: 0,
  hasInternet: false,
  internetCost: 0,
};
const state = ref<FormRoom>({ ...initialValues });

const { data, status, execute: createRoom } = await useAPI("/api/rooms", {
  immediate: false,
  watch: false,
  method: "POST",
  body: state,
});
const loading = computed(() => status.value === "pending");

const { showNotification } = useNotification();
const onCreateRoom = async () => {
  await createRoom();
  if (!data.value) {
    showNotification({
      type: "error",
      message: "Error creating room",
    });
  }
  else {
    showNotification({
      type: "success",
      message: "Room created successfully",
    });
    state.value = initialValues;
  }
};
</script>

<template>
  <div class="p-4">
    <FormRoom v-model:form="state" :is-loading="loading" @send-form="onCreateRoom" />
  </div>
</template>
