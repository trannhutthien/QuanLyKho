import type { IUserRepository } from '../../../domain/repositories/IUserRepository'
import type { CreateUserRequest, AuthResponse } from '../../../domain/entities/User'

export class RegisterCommand {
  constructor(private userRepository: IUserRepository) {}

  async execute(registerData: CreateUserRequest): Promise<AuthResponse> {
    try {
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
}
