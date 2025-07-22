export interface User {
  id: string
  email: string
  matKhau: string
  hoTen: string
  soDienThoai?: string
  vaiTro: string
  trangThai: boolean
  createdAt: Date
  updatedAt: Date
  lanDangNhapCuoi?: Date
}

export interface CreateUserRequest {
  tenNguoiDung: string;
  email: string;
  matKhau: string;
  quyenTruyCap?: number;
}

export interface LoginRequest {
  email: string;
  matKhau: string;
}

export interface AuthResponse {
  success: boolean;
  user?: Omit<User, 'matKhau'>;
  message?: string;
}

