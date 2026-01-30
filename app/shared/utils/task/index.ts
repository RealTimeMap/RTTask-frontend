import type { CompanyTaskPayload, CompanyTaskResponse } from './index.type'
import { api } from '~/shared/services/api/fetch.helpers'

export const taskApi = {
  getCompanyTask(params: CompanyTaskPayload): Promise<CompanyTaskResponse> {
    return api.get<CompanyTaskResponse, CompanyTaskPayload>('/task', params)
  },
}
