<script setup lang="ts">
definePageMeta({
  title: "Configuración",
  name: "config",
});

const { getElectricityInfo, getWaterInfo } = useServiceInfo();
</script>

<template>
  <div class="p-4">
    <p>Precio de la luz: {{ getElectricityInfo().unitPrice }}</p>
    <p>Precio del: {{ getWaterInfo().unitPrice }}</p>
  </div>
</template>
