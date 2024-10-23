<script setup lang="ts">
import type { z } from "zod";
import type { Form } from "#ui/types";

type FormTenant = z.infer<typeof tenantSchema>;
const form = useTemplateRef<Form<FormTenant>>("tenant-form");

const initialValues = {
  name: "",
  paymentDay: 1,
  isDeleted: false,
};
const state = ref<FormTenant>(initialValues);

const { data, status, execute: createTenant } = await useAPI("/api/tenants", {
  immediate: false,
  watch: false,
  method: "POST",
  body: state,
});

const pending = computed(() => status.value === "pending");

const { showNotification } = useNotification();
const onSubmit = async () => {
  await createTenant();
  if (!data.value) {
    showNotification({
      type: "error",
      message: "Error creating tenant",
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
    <UForm
      ref="tenant-form"
      class="flex flex-col gap-4 max-w-xl"
      :state="state"
      :schema="tenantSchema"
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
      <div>
        <UButton label="Submit" :loading="pending" @click="onSubmit" />
      </div>
    </UForm>
  </div>
</template>
