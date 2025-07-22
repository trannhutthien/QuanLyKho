import type { User, CreateUserRequest } from '../../domain/entities/User'
import type { IUserRepository } from '../../domain/repositories/IUserRepository'

export interface LoginResult {
  success: boolean
  data?: {
    user: User
    token: string
  }
  message?: string
}

export class UserRepository implements IUserRepository {
  // Mock data store
  private users: User[] = [
    {
      id: '1',
      email: 'admin@test.com',
      matKhau: '123456',
      hoTen: 'Admin Test',
      vaiTro: 'admin',
      trangThai: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

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

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email)
    return user || null
  }

  async create(userData: CreateUserRequest): Promise<User> {
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      matKhau: userData.matKhau,
      hoTen: userData.tenNguoiDung,
      vaiTro: 'user',
      trangThai: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    this.users.push(newUser)
    return newUser
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(u => u.id === id)
    return user || null
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const userIndex = this.users.findIndex(u => u.id === id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    
    this.users[userIndex] = { ...this.users[userIndex], ...userData, updatedAt: new Date() }
    return this.users[userIndex]
  }

  async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex(u => u.id === id)
    if (userIndex === -1) {
      return false
    }
    
    this.users.splice(userIndex, 1)
    return true
  }
}



