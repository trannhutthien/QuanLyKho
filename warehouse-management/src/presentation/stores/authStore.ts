import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../../domain/entities/User'
import { UserRepository } from '../../infrastructure/repositories/UserRepository'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => !!token.value)
  const userRepository = new UserRepository()

  const login = async (credentials: { email: string; matKhau: string }) => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await userRepository.login(credentials.email, credentials.matKhau)
      
      if (response.success && response.data) {
        user.value = response.data.user
        token.value = response.data.token
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      } else {
        error.value = response.message || 'Đăng nhập thất bại'
      }
      
      return response
    } catch (err) {
      error.value = 'Lỗi kết nối'
      return { success: false, message: 'Lỗi kết nối' }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const initAuth = () => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    initAuth
  }
})


