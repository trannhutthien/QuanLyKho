import type { IUserRepository } from '../../../domain/repositories/IUserRepository'
import type { LoginRequest, AuthResponse } from '../../../domain/entities/User'

export class LoginCommand {
  constructor(private userRepository: IUserRepository) {}

  async execute(loginData: LoginRequest): Promise<AuthResponse> {
    try {
      const user = await this.userRepository.findByEmail(loginData.email)
      
      if (!user) {
        return {
          success: false,
          message: 'Email không tồn tại!'
        }
      }

      // So sánh password trực tiếp (không mã hóa)
      if (user.matKhau !== loginData.matKhau) {
        return {
          success: false,
          message: 'Mật khẩu không đúng!'
        }
      }

      const { matKhau, ...userWithoutPassword } = user
      
      return {
        success: true,
        user: userWithoutPassword,
        message: 'Đăng nhập thành công!'
      }
    } catch (error) {
      console.error('❌ Lỗi đăng nhập:', error)
      return {
        success: false,
        message: 'Có lỗi xảy ra trong quá trình đăng nhập!'
      }
    }
  }
}
