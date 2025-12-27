import type { LoginPayload, LoginResponse } from './index.type'
import { api } from '~/shared/services/api/fetch.helpers'

export const authApi = {
  login(payload: LoginPayload): Promise<LoginResponse> {
    return api.post('/auth/login', payload)
  },
}
