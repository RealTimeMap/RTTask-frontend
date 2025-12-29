import type { LoginPayload } from '../utils/auth/index.type'
import { defineStore } from 'pinia'
import { authApi } from '../utils/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = useCookie('token')

  async function login(payload: LoginPayload, remember: boolean = false) {
    try {
      const response = await authApi.login(payload)

      const cookieOptions = {
        maxAge: remember ? 60 * 60 * 24 * 30 : undefined,
        sameSite: 'lax' as const,
        secure: true,
      }

      const tokenCookie = useCookie('token', cookieOptions)
      tokenCookie.value = response.accessToken

      token.value = response.accessToken

      await navigateTo('/')
    }
    catch (error) {
      console.error('Auth Store: Login failed', error)
      throw error
    }
  }

  return {
    login,
  }
})
