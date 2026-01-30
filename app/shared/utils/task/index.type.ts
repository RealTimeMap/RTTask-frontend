export interface CompanyTaskResponse {
  hasNext: boolean
  hasPrev: boolean
  items: Item[]
  total: number
  totalPages: number
}

export interface Item {
  company: Company
  completedAt: string
  createdAt: string
  creator: Tor
  deadlineAt: string
  description: string
  executor: Tor
  files: Logo[]
  id: number
  priority: number
  startAt: string
  status: string
  title: string
  updatedAt: string
}

export interface Company {
  description: string
  id: number
  logo: Logo
  name: string
}

export interface Logo {
  id: string
  mimeType: string
  name: string
  size: number
  url: string
}

export interface Tor {
  email: string
  fullName: string
  id: number
}

export interface CompanyTaskPayload {
  companyId: number
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: string
  showCompleted?: boolean
}
