import type { IUserRepository } from '../../../domain/repositories/IUserRepository'
import type { CreateUserRequest, AuthResponse } from '../../../domain/entities/User'

// Command xử lý logic đăng ký với validation
export class RegisterCommand {
  constructor(private userRepository: IUserRepository) {}

  async execute(registerData: CreateUserRequest): Promise<AuthResponse> {
    try {
      // Validation email format
      if (!this.isValidEmail(registerData.email)) {
        return {
          success: false,
          message: 'Email không hợp lệ!'
        }
      }

      // Validation password strength
      if (registerData.matKhau.length < 6) {
        return {
          success: false,
          message: 'Mật khẩu phải có ít nhất 6 ký tự!'
        }
      }

      // Kiểm tra email đã tồn tại
      const existingUser = await this.userRepository.findByEmail(registerData.email)
      if (existingUser) {
        return {
          success: false,
          message: 'Email đã được sử dụng!'
        }
      }

      // Tạo user mới
      const newUser = await this.userRepository.create(registerData)
      const { matKhau, ...userWithoutPassword } = newUser

      return {
        success: true,
        user: userWithoutPassword,
        message: 'Đăng ký thành công!'
      }
    } catch (error) {
      console.error('❌ Lỗi đăng ký:', error)
      return {
        success: false,
        message: 'Có lỗi xảy ra trong quá trình đăng ký!'
      }
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

