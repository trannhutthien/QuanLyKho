export interface LoginRequest {
  email: string
  matKhau: string
}

export interface LoginResponse {
  user: any
  token: string
}