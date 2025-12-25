<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

definePageMeta({
  layout: 'no-empty',
})

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true,
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true,
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox',
}]

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  useCookie('token', {
    default: () => `${payload.data.email}-token`,
  })
  navigateTo('/')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <u-page-card class="w-full max-w-md">
      <u-auth-form
        :schema="schema"
        title="Welcome back!"
        icon="i-lucide-user"
        :fields="fields"
        @submit="onSubmit"
      >
        <template #footer>
          <div class="text-sm text-center">
            Don't have an account?
            <nuxt-link
              to="/register"
              class="text-primary font-medium hover:underline"
            >
              Sign up
            </nuxt-link>
          </div>
        </template>
      </u-auth-form>
    </u-page-card>
  </div>
</template>
