// Domain entity định nghĩa User types và interfaces
export interface User {
  id: string;
  email: string;
  matKhau: string;
  hoTen: string;
  soDienThoai?: string;
  vaiTro: string;
  trangThai: boolean;
  createdAt: Date;
  updatedAt: Date;
  lanDangNhapCuoi?: Date;
}

export interface LoginRequest {
  email: string;
  matKhau: string;
}

export interface CreateUserRequest {
  tenNguoiDung: string;
  email: string;
  matKhau: string;
  soDienThoai?: string;
  quyenTruyCap?: number;
}

export interface AuthResponse {
  success: boolean;
  user?: Omit<User, 'matKhau'>;
  message?: string;
  token?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  hoTen: string;
  soDienThoai?: string;
  vaiTro: string;
  createdAt: Date;
  lanDangNhapCuoi?: Date;
}


