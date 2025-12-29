<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'
import { authApi } from '~/shared/utils/auth'

definePageMeta({
  layout: 'no-empty',
})

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

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  try {
    const { email, password, remember } = payload.data

    const response = await authApi.login({ email, password })

    const cookieMaxAge = remember ? 60 * 60 * 24 * 30 : undefined

    const tokenCookie = useCookie('token', {
      maxAge: cookieMaxAge,
      sameSite: 'lax',
      secure: true,
    })

    tokenCookie.value = response.accessToken

    await navigateTo('/')
  }
  catch (error) {
    console.error('Login failed:', error)
  }
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
