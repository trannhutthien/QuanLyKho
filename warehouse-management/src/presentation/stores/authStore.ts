import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthService } from '../../application/services/auth/AuthService'
import type { User, LoginRequest, CreateUserRequest, AuthResponse } from '../../domain/entities/User'

// Store quản lý authentication state và gọi AuthService
export const useAuthStore = defineStore('auth', () => {
  const user = ref<Omit<User, 'matKhau'> | null>(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref('')

  const authService = new AuthService()

  const login = async (loginData: LoginRequest): Promise<AuthResponse> => {
    loading.value = true
    error.value = ''
    
    try {
      const result = await authService.login(loginData)
      
      if (result.success && result.user) {
        user.value = result.user
        isAuthenticated.value = true
        localStorage.setItem('user', JSON.stringify(result.user))
      } else {
        error.value = result.message || 'Đăng nhập thất bại'
      }
      
      return result
    } catch (err) {
      error.value = 'Có lỗi xảy ra trong quá trình đăng nhập'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const register = async (registerData: CreateUserRequest): Promise<AuthResponse> => {
    loading.value = true
    error.value = ''
    
    try {
      const result = await authService.register(registerData)
      
      if (!result.success) {
        error.value = result.message || 'Đăng ký thất bại'
      }
      
      return result
    } catch (err) {
      error.value = 'Có lỗi xảy ra trong quá trình đăng ký'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
  }

  const initializeAuth = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    initializeAuth
  }
})




