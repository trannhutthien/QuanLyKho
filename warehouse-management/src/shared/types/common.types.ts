// Kiểu dữ liệu chung
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}