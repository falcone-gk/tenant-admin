<script setup lang="ts">
import type { Form } from "#ui/types";

definePageMeta({
  layout: "centered",
});

const state = reactive<LoginSchemaType>({
  username: "",
  password: "",
});

const form = useTemplateRef<Form<LoginSchemaType>>("login-form");
const { login, isLoggedIn } = useAuth();
const onSubmit = async () => {
  await login(state);
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
};
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
        <UFormGroup label="Username" name="username">
          <UInput v-model="state.username" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <div>
          <UButton type="submit" label="Login" />
        </div>
      </UForm>
    </UCard>
  </div>
</template>
