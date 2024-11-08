<script setup lang="ts">
const publicLinks = [
  // { label: "Home", icon: "i-heroicons-home-solid", to: "/admin", exact: true },
  { label: "Inquilinos", icon: "i-heroicons-user-group-solid", to: "/admin/tenants" },
  { label: "Cuartos", icon: "i-heroicons-building-office-solid", to: "/admin/rooms" },
  { label: "Deudas", icon: "i-heroicons-currency-dollar-solid", to: "/admin/debts" },
  { label: "Configuración", icon: "i-heroicons-cog-6-tooth-20-solid", to: "/admin/config" },
];

const links = [publicLinks];

const { user, logout } = useAuth();
const onLogout = async () => {
  await logout();
  navigateTo("/login");
};
</script>

<template>
  <UCard
    :ui="{
      base: 'hidden md:flex flex-col w-[var(--sidebar-width)]',
      rounded: '',
      background: 'bg-white dark:bg-gray-950',
      footer: { base: 'mt-auto' },
    }"
  >
    <template #header>
      <Typography tag="h1" variant="h3">
        {{ user?.username }}
      </Typography>
    </template>

    <UVerticalNavigation
      class="min-w-[250px]"
      :links="links"
      :ui="{
        active: 'before:bg-primary-300 dark:before:bg-primary-600',
      }"
    />

    <template #footer>
      <UButton
        class="w-full"
        icon="i-heroicons-arrow-right-end-on-rectangle-solid"
        label="Logout"
        variant="outline"
        @click="onLogout"
      />
    </template>
  </UCard>
</template>
