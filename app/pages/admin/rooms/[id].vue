<script lang="ts" setup>
const route = useRoute();
const id = route.params.id;

const state = ref<Room>();
await useAPI<Room>(`/api/rooms/${id}`, {
  onResponse: ({ response }) => {
    state.value = response._data as Room;
  },
});

const { data, status, execute: updateRoom } = await useAPI(`/api/rooms/${id}`, {
  immediate: false,
  watch: false,
  method: "PUT",
  body: state,
});
const loading = computed(() => status.value === "pending");

const { showNotification } = useNotification();
const onUpdateRoom = async () => {
  await updateRoom();
  if (!data.value) {
    showNotification({
      type: "error",
      message: "Error updating tenant",
    });
  }
  else {
    showNotification({
      type: "success",
      message: "Room updated successfully",
    });
  }
};
</script>

<template>
  <div class="p-4">
    <FormRoom v-model:form="state" :is-loading="loading" @send-form="onUpdateRoom" />
  </div>
</template>
