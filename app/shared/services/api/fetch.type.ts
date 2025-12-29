import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import type { FetchError } from 'ofetch'

export interface BackendErrorDetail {
  message?: string
  detail?: string
  title?: string
  type?: string
  status?: number
  errors?: Record<string, string[]>
  [key: string]: unknown
}

export interface ApiError<T = BackendErrorDetail> {
  message: string
  status?: number
  details?: T
  raw: FetchError | Error
}
export type SupportedBody = string | number | boolean | Record<string, any> | Array<any> | FormData | Blob | null
export type SupportedQuery = Record<string, string | number | boolean | undefined | Array<string | number | boolean>>

export type RequestConfig<B = undefined, Q = undefined> = Omit<
  NitroFetchOptions<NitroFetchRequest>,
  'method' | 'body' | 'query'
> & {
  body?: B
  query?: Q
}
