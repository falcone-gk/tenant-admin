<script setup lang="ts">
import type { z } from "zod";
import type { Form } from "#ui/types";

definePageMeta({
  layout: "centered",
});

type LoginSchemaType = z.infer<typeof loginSchema>;
const state = reactive<LoginSchemaType>({
  username: "",
  password: "",
});

const { data: session, execute } = useFetch("/api/auth/login", {
  immediate: false,
  watch: false,
  method: "POST",
  body: state,
});

const form = useTemplateRef<Form<LoginSchemaType>>("login-form");
const { setSession } = useAuth();
const onSubmit = async () => {
  await execute();
  if (!session.value) {
    form.value?.setErrors([
      {
        message: "Wrong credentials.",
        path: "password",
      },
    ]);
  }
  else {
    setSession(session.value.data);
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
