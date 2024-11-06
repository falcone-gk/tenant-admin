<script lang="ts" setup>
const route = useRoute();
const id = route.params.id;

const state = ref<Tenant>();
await useAPI<Tenant>(`/api/tenants/${id}`, {
  onResponse: ({ response }) => {
    state.value = response._data as Tenant;
  },
});

const { data, status, error, execute: updateTenant } = await useAPI(`/api/tenants/${id}`, {
  immediate: false,
  watch: false,
  method: "PUT",
  body: state,
});
const loading = computed(() => status.value === "pending");

const { showNotification } = useNotification();
const onUpdateTenant = async () => {
  await updateTenant();
  if (!data.value) {
    showNotification({
      type: "error",
      message: error.value ? error.value.data.message : "Error updating tenant",
    });
  }
  else {
    showNotification({
      type: "success",
      message: "Tenant updated successfully",
    });
  }
};
</script>

<template>
  <div class="p-4">
    <FormTenant v-model:form="state" :is-loading="loading" @send-form="onUpdateTenant" />
  </div>
</template>
