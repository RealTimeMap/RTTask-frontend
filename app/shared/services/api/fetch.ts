import type {
  ApiError,
  BackendErrorDetail,
  RequestConfig,
  SupportedBody,
  SupportedQuery,
} from './fetch.type'
import { FetchError } from 'ofetch'

function isBackendError(data: unknown): data is BackendErrorDetail {
  if (typeof data !== 'object' || data === null)
    return false

  return 'message' in data || 'detail' in data || 'title' in data
}
function normalizeError(error: unknown): ApiError {
  const apiError: ApiError = {
    message: 'Произошла неизвестная ошибка',
    raw: error instanceof Error ? error : new Error(String(error)),
  }

  if (error instanceof FetchError) {
    apiError.status = error.response?.status
    const errorData = error.response?._data

    if (isBackendError(errorData)) {
      apiError.message = errorData.detail || errorData.message || errorData.title || 'Ошибка сервера'
      apiError.details = errorData
    }
    else {
      apiError.message = error.statusMessage || error.message || 'Ошибка сети'
    }
  }

  return apiError
}

const $api = $fetch.create({
  baseURL: import.meta.env.VITE_API_URL,
  onRequest({ options }) {
    const token = useCookie('access').value
    if (token) {
      options.headers = new Headers(options.headers)
      options.headers.set('Authorization', `Bearer ${token}`)
    }
  },
})

export async function performRequest<T, B extends SupportedBody = any, Q extends SupportedQuery = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  data?: B | Q,
  config: RequestConfig<B, Q> = {},
): Promise<T> {
  try {
    const isGetOrDelete = method === 'GET' || method === 'DELETE'

    const finalOptions = {
      ...config,
      method,
      query: isGetOrDelete ? (data as Q) : config.query,
      body: !isGetOrDelete ? (data as B) : config.body,
    }

    return await $api<T>(url, finalOptions as any)
  }
  catch (error) {
    throw normalizeError(error)
  }
}
