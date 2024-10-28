<script setup lang="ts">
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["sendForm"]);
const state = defineModel<Tenant | FormTenant>("form", { required: true });
</script>

<template>
  <UForm
    class="flex flex-col gap-4 max-w-xl"
    :state="state"
    :schema="tenantSchema"
    @submit="emit('sendForm')"
  >
    <UFormGroup label="Nombre" name="name">
      <UInput v-model="state.name" placeholder="Enter name" />
    </UFormGroup>
    <UFormGroup label="Día de pago" name="paymentDay">
      <UInput
        v-model="state.paymentDay"
        placeholder="Enter payment day"
        type="number"
        :min="1"
        :max="31"
      />
    </UFormGroup>
    <UFormGroup label="Prefijo de deuda" name="debtPrefix">
      <UInput v-model="state.debtPrefix" />
    </UFormGroup>
    <div>
      <UButton type="submit" label="Submit" :loading="props.isLoading" />
    </div>
  </UForm>
</template>
