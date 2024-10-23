<script setup lang="ts">
import type { Form } from "#ui/types";

interface TenantOption {
  id: number;
  name: string;
}
const { data: tenantOptions } = await useAPI<TenantOption[]>("/api/tenants/list");

const form = useTemplateRef<Form<FormRoom>>("room-form");
const registerOptions = ["fixed", "variable"] as const;

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
const state = ref<FormRoom>(initialValues);

const { data, status, execute: createRoom } = await useAPI("/api/rooms", {
  immediate: false,
  watch: false,
  method: "POST",
  body: state,
});

const pending = computed(() => status.value === "pending");

const { showNotification } = useNotification();
const onSubmit = async () => {
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
    <UForm
      ref="room-form"
      class="flex flex-col gap-4 max-w-xl"
      :state="state"
      :schema="roomSchema"
    >
      <UFormGroup label="Código" name="code">
        <UInput v-model="state.code" placeholder="Ingresar código" />
      </UFormGroup>
      <UFormGroup label="Inquilino" name="tenantId">
        <UButtonGroup>
          <USelect
            v-model="state.tenantId"
            :options="tenantOptions"
            option-attribute="name"
            value-attribute="id"
            placeholder="Seleccionar Inquilino"
            @change="() => state.tenantId = Number(state.tenantId)"
          />
          <UButton
            icon="i-heroicons-x-mark-solid"
            color="green"
            @click="state.tenantId = null"
          />
        </UButtonGroup>
      </UFormGroup>
      <UFormGroup label="Alquiler" name="rent">
        <UInput
          v-model="state.rent"
          placeholder="Ingresar renta"
          type="number"
          :min="1"
        />
      </UFormGroup>
      <UFormGroup label="Tipo de registro de electricidad" name="electricityTypeRegister">
        <USelect
          v-model="state.electricityTypeRegister"
          :options="registerOptions"
          placeholder="Seleccionar tipo de registro"
        />
      </UFormGroup>
      <UFormGroup label="Registro de luz" name="electricityRegister">
        <UInput
          v-model="state.electricityRegister"
          placeholder="Ingresar registro de luz"
          type="number"
          :min="0"
        />
      </UFormGroup>
      <UFormGroup label="Tipo de registro de agua" name="waterTypeRegister">
        <USelect
          v-model="state.waterTypeRegister"
          :options="registerOptions"
          placeholder="Seleccionar tipo de registro"
        />
      </UFormGroup>
      <UFormGroup label="Registro de agua" name="waterRegister">
        <UInput
          v-model="state.waterRegister"
          placeholder="Ingresar registro de agua"
          type="number"
          :min="0"
        />
      </UFormGroup>
      <UFormGroup label="Tiene TV" name="hasTV">
        <UToggle
          v-model="state.hasTV"
          on-icon="i-heroicons-check-20-solid"
          off-icon="i-heroicons-x-mark-20-solid"
          @change="state.tvCost = 0"
        />
      </UFormGroup>
      <UFormGroup label="Costo de TV" name="tvCost">
        <UInput
          v-model="state.tvCost"
          :disabled="!state.hasTV"
          placeholder="Ingresar costo de TV"
          type="number"
          :min="0"
        />
      </UFormGroup>
      <UFormGroup label="Tiene Internet" name="hasInternet">
        <UToggle
          v-model="state.hasInternet"
          on-icon="i-heroicons-check-20-solid"
          off-icon="i-heroicons-x-mark-20-solid"
          @change="state.internetCost = 0"
        />
      </UFormGroup>
      <UFormGroup label="Costo de Internet" name="internetCost">
        <UInput
          v-model="state.internetCost"
          :disabled="!state.hasInternet"
          placeholder="Ingresar costo de internet"
          type="number"
          :min="0"
        />
      </UFormGroup>
      <div>
        <UButton label="Submit" :loading="pending" @click="onSubmit" />
      </div>
    </UForm>
  </div>
</template>
