<script setup lang="ts">
import { format, parseISO } from "date-fns";
import Big from "big.js";

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["sendForm"]);
const state = defineModel<FormDebt>("form", { required: true });

const { getElectricityInfo, getWaterInfo } = useServiceInfo();

// Request for tenant data
const { getTenants, getTenantOptions } = useTenant();
const { data: tenants } = await getTenants();
const tenantsOpt = await getTenantOptions();

const selectedTenant = computed(() => {
  if (!tenants.value) return null;
  return tenants.value.find(tenant => tenant.id === state.value.tenantId);
});

watch(
  selectedTenant,
  (tenant) => {
    if (!tenant) {
      state.value.code = "";
    }
    else {
      state.value.code = `${tenant.debtPrefix}${tenant.debtCounter + 1}`;
    }
  },
);

// Request for rooms data
const { getRooms, getRoomOptions } = useRoom();
const { data: rooms } = await getRooms();
const roomsOpt = await getRoomOptions();
const selectedRoom = computed(() => {
  if (!rooms.value) return null;
  return rooms.value.find(room => room.id === state.value.roomId);
});
const currentRoomOptions = computed(() => {
  if (!roomsOpt) return [];
  return roomsOpt.filter(room => room.tenantId === state.value.tenantId);
});

watch(
  selectedRoom,
  (room) => {
    if (!room) {
      state.value.rentCost = 0;
      state.value.prevElectricityRegister = 0;
      state.value.prevWaterRegister = 0;
      state.value.currentElectricityRegister = 0;
      state.value.currentWaterRegister = 0;
      state.value.tvCost = 0;
      state.value.internetCost = 0;
    }
    else {
      state.value.rentCost = room.rent;
      state.value.prevElectricityRegister = room.electricityRegister;
      state.value.prevWaterRegister = room.waterRegister;
      state.value.tvCost = room.tvCost;
      state.value.internetCost = room.internetCost;
    }
  },
);

watch(
  () => state.value.currentElectricityRegister,
  (value) => {
    if (!value || !state.value.prevElectricityRegister) {
      state.value.monthElectricityConsume = 0;
      state.value.electricityCost = "0.00";
    }
    else {
      const electricityUnitCost = getElectricityInfo().unitPrice;
      const currentElectricityRegister = Big(value);
      state.value.monthElectricityConsume = currentElectricityRegister
        .minus(state.value.prevElectricityRegister)
        .toNumber();
      state.value.electricityCost = Big(state.value.monthElectricityConsume)
        .times(electricityUnitCost)
        .toFixed(2)
        .toString();
    }
  },
);

watch(
  () => state.value.currentWaterRegister,
  (value) => {
    if (!value || !state.value.prevWaterRegister) {
      state.value.monthWaterConsume = 0;
      state.value.waterCost = "0.00";
    }
    else {
      const electricityUnitCost = getWaterInfo().unitPrice;
      const currentElectricityRegister = Big(value);
      state.value.monthWaterConsume = currentElectricityRegister
        .minus(state.value.prevWaterRegister)
        .toNumber();
      state.value.waterCost = Big(state.value.monthWaterConsume)
        .times(electricityUnitCost)
        .toFixed(2)
        .toString();
    }
  },
);

const totalAmount = computed(() => {
  return Big(state.value.rentCost)
    .plus(state.value.electricityCost)
    .plus(state.value.waterCost)
    .plus(state.value.tvCost)
    .plus(state.value.internetCost)
    .toFixed(2)
    .toString();
});

watch(
  totalAmount,
  (value) => {
    state.value.amount = value;
  },
);

function onChangeTenant(value: string) {
  state.value.tenantId = Number(value);
  state.value.roomId = null;
}
function onCleanTenant() {
  state.value.tenantId = null;
  state.value.roomId = null;
}
</script>

<template>
  <UForm
    class="max-w-xl space-y-12"
    :state="state"
    :schema="insertDebtSchema"
    @submit="emit('sendForm')"
  >
    <div class="space-y-4">
      <span>Información base:</span>
      <div class="grid grid-cols-2 gap-4">
        <UFormGroup label="Inquilino" name="tenantId">
          <UButtonGroup>
            <USelect
              v-model="state.tenantId"
              :options="tenantsOpt"
              option-attribute="name"
              value-attribute="id"
              placeholder="Seleccionar Inquilino"
              @change="onChangeTenant"
            />
            <UButton
              icon="i-heroicons-x-mark-solid"
              color="green"
              @click="onCleanTenant"
            />
          </UButtonGroup>
        </UFormGroup>

        <UFormGroup label="Código de deuda" name="code">
          <UInput v-model="state.code" readonly />
        </UFormGroup>

        <UFormGroup label="Cuartos" name="roomId">
          <UButtonGroup>
            <USelect
              v-model="state.roomId"
              :options="currentRoomOptions"
              option-attribute="code"
              value-attribute="id"
              placeholder="Seleccionar Cuarto"
              @change="() => state.roomId = Number(state.roomId)"
            />
            <UButton
              icon="i-heroicons-x-mark-solid"
              color="green"
              @click="state.roomId = null"
            />
          </UButtonGroup>
        </UFormGroup>

        <UFormGroup label="Renta" name="rentCost">
          <UInput v-model="state.rentCost" type="number" readonly />
        </UFormGroup>
        <div>
          <label class="text-sm font-medium text-gray-700">Fecha de registro:</label>
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton class="mt-1" icon="i-heroicons-calendar-days-20-solid" :label="format(parseISO(state.date), 'd MMM, yyy')" />
            <template #panel="{ close }">
              <UiDatePicker
                v-model.string="state.date"
                is-required
                @close="close"
              />
            </template>
          </UPopover>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <span>Lectura de luz:</span>
      <div class="flex gap-2">
        <UFormGroup label="Anterior" name="prevElectricityRegister">
          <UInput v-model="state.prevElectricityRegister" type="number" readonly />
        </UFormGroup>
        <UFormGroup label="Actual" name="currentElectricityRegister">
          <UInput v-model="state.currentElectricityRegister" type="number" />
        </UFormGroup>
        <UFormGroup label="Consumo del mes">
          <UInput v-model="state.monthElectricityConsume" type="number" readonly />
        </UFormGroup>
        <UFormGroup label="Costo de luz" name="electricityCost">
          <UInput v-model="state.electricityCost" type="number" readonly />
        </UFormGroup>
      </div>
    </div>

    <div class="space-y-4">
      <span>Lectura de agua:</span>
      <div class="flex gap-2">
        <UFormGroup label="Anterior" name="prevWaterRegister">
          <UInput v-model="state.prevWaterRegister" type="number" readonly />
        </UFormGroup>
        <UFormGroup label="Actual" name="currentWaterRegister">
          <UInput v-model="state.currentWaterRegister" type="number" />
        </UFormGroup>
        <UFormGroup label="Consumo del mes">
          <UInput v-model="state.monthWaterConsume" type="number" readonly />
        </UFormGroup>
        <UFormGroup label="Costo de agua" name="waterCost">
          <UInput v-model="state.waterCost" type="number" readonly />
        </UFormGroup>
      </div>
    </div>

    <div class="space-y-4">
      <span>Costos de servicios extras:</span>
      <div class="flex gap-2">
        <UFormGroup label="Costo de TV" name="tvCost">
          <UInput v-model="state.tvCost" type="number" readonly />
        </UFormGroup>
        <UFormGroup label="Costo de Internet" name="internetCost">
          <UInput v-model="state.internetCost" type="number" readonly />
        </UFormGroup>
      </div>
    </div>

    <div>
      <UFormGroup label="Monto total:" name="amount">
        <UInput v-model="state.amount" type="string" readonly />
      </UFormGroup>
    </div>

    <div>
      <UButton type="submit" label="Guardar" :loading="props.isLoading" />
    </div>
  </UForm>
</template>
