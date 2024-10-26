<script setup lang="ts">
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["sendForm"]);
const { getTenantOptions } = useTenant();
const { data: tenantOptions } = await getTenantOptions();
const registerOptions = ["fixed", "variable"] as const;
const state = defineModel<Room | FormRoom>("form", { required: true });
</script>

<template>
  <UForm
    class="flex flex-col gap-4 max-w-xl"
    :state="state"
    :schema="roomSchema"
    @submit="emit('sendForm')"
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
      <UButton type="submit" label="Submit" :loading="props.isLoading" />
    </div>
  </UForm>
</template>
