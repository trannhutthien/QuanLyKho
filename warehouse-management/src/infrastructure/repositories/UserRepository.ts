import type { User } from '../../domain/entities/User'

export interface LoginResult {
  success: boolean
  data?: {
    user: User
    token: string
  }
  message?: string
}

export class UserRepository {
  async login(email: string, matKhau: string): Promise<LoginResult> {
    try {
      if (email === 'admin@test.com' && matKhau === '123456') {
        const mockUser: User = {
          id: '1',
          email: 'admin@test.com',
          matKhau: '',
          hoTen: 'Admin Test',
          vaiTro: 'admin',
          trangThai: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        return {
          success: true,
          data: {
            user: mockUser,
            token: 'mock-jwt-token'
          }
        }
      }
      
      return {
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      }
    } catch (error) {
      return {
        success: false,
        message: 'Lỗi kết nối server'
      }
    }
  }
}


