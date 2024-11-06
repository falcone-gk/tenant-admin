<script setup lang="ts">
import type { Form } from "#ui/types";

definePageMeta({
  layout: "centered",
});

const state = ref<LoginSchemaType>({
  username: "",
  password: "",
});

const form = useTemplateRef<Form<LoginSchemaType>>("login-form");
const { login, isLoggedIn, pendingAuth } = useAuth();
const isLoginBtnClicked = ref(false);
const onSubmit = async () => {
  isLoginBtnClicked.value = true;
  await login(state.value);
  if (!isLoggedIn.value) {
    form.value?.setErrors([
      {
        message: "Wrong credentials.",
        path: "password",
      },
    ]);
  }
  else {
    navigateTo("/admin");
  }
  isLoginBtnClicked.value = false;
};

const isGuestBtnClicked = ref(false);
const guestData = {
  username: "guest",
  password: "guest",
};
async function onSubmitGuest() {
  isGuestBtnClicked.value = true;
  await login(guestData);
  isGuestBtnClicked.value = false;
  navigateTo("/admin");
}
</script>

<template>
  <div>
    <UCard :ui="{ body: { base: 'min-w-[300px]' } }">
      <UForm
        ref="login-form"
        class="flex flex-col gap-4"
        :schema="loginSchema"
        :state="state"
        @submit="onSubmit"
      >
        <UFormGroup label="Nombre de usuario" name="username">
          <UInput v-model="state.username" />
        </UFormGroup>

        <UFormGroup label="Contraseña" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <div>
          <UButton
            type="submit"
            label="Login"
            :loading="pendingAuth && isLoginBtnClicked"
            block
          />
        </div>
      </UForm>
      <div class="mt-4">
        <UButton
          label="Ingresar como invitado"
          variant="outline"
          color="teal"
          block
          :loading="pendingAuth && isGuestBtnClicked"
          @click="onSubmitGuest"
        />
      </div>
    </UCard>
  </div>
</template>
