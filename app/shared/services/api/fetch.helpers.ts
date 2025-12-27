import type { RequestConfig, SupportedBody, SupportedQuery } from './fetch.type'
import { performRequest } from './fetch'

export const api = {
  get<T, Q extends SupportedQuery = any>(
    url: string,
    params?: Q,
    config?: RequestConfig<never, Q>,
  ): Promise<T> {
    return performRequest<T, never, Q>('GET', url, params, config)
  },

  post<T, B extends SupportedBody = any, Q extends SupportedQuery = any>(
    url: string,
    data?: B,
    config?: RequestConfig<B, Q>,
  ): Promise<T> {
    return performRequest<T, B, Q>('POST', url, data, config)
  },

  put<T, B extends SupportedBody = any, Q extends SupportedQuery = any>(
    url: string,
    data?: B,
    config?: RequestConfig<B, Q>,
  ): Promise<T> {
    return performRequest<T, B, Q>('PUT', url, data, config)
  },

  patch<T, B extends SupportedBody = any, Q extends SupportedQuery = any>(
    url: string,
    data?: B,
    config?: RequestConfig<B, Q>,
  ): Promise<T> {
    return performRequest<T, B, Q>('PATCH', url, data, config)
  },

  delete<T, Q extends SupportedQuery = any>(
    url: string,
    params?: Q,
    config?: RequestConfig<never, Q>,
  ): Promise<T> {
    return performRequest<T, never, Q>('DELETE', url, params, config)
  },
}
