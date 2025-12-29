<script lang="ts" setup>
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import type { ApiError } from '~/shared/services/api/fetch.type'
import * as z from 'zod'
import { useAuthStore } from '~/shared/store/use-auth-store'

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    required: true,
  },
  {
    name: 'remember',
    type: 'checkbox',
    label: 'Remember me',
    defaultValue: true,
  },
]

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
  remember: z.boolean().optional(),
})

type Schema = z.output<typeof schema>

const authStore = useAuthStore()
const isLoading = ref(false)
const toast = useToast()

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  isLoading.value = true
  try {
    await authStore.login({
      email: payload.data.email,
      password: payload.data.password,
    }, payload.data.remember)
  }
  catch (err) {
    const apiError = err as ApiError

    toast.add({
      title: String(apiError.message),
      description: apiError.details?.title,
      color: 'error',
      icon: 'i-lucide-alert-circle',
    })
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <u-auth-form
    title="Welcome back!"
    icon="i-lucide-user"
    :schema="schema"
    :fields="fields"
    :loading="isLoading"
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
</template>
