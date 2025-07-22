<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Đăng Ký</h2>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="tenNguoiDung">Tên người dùng:</label>
          <input
            id="tenNguoiDung"
            v-model="registerData.tenNguoiDung"
            type="text"
            required
            class="form-control"
            placeholder="Nhập tên người dùng"
          />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="registerData.email"
            type="email"
            required
            class="form-control"
            placeholder="Nhập email"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Mật khẩu:</label>
          <input
            id="password"
            v-model="registerData.matKhau"
            type="password"
            required
            class="form-control"
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Nhập lại mật khẩu:</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="form-control"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <button 
          type="submit" 
          :disabled="loading"
          class="btn-register"
        >
          {{ loading ? 'Đang đăng ký...' : 'Đăng ký' }}
        </button>

        <div class="login-link">
          <p>Đã có tài khoản? 
            <router-link to="/login" class="link">Đăng nhập ngay</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '../../../application/services/auth/AuthService'

interface RegisterData {
  tenNguoiDung: string
  email: string
  matKhau: string
}

const router = useRouter()
const authService = new AuthService()

const registerData = ref<RegisterData>({
  tenNguoiDung: '',
  email: '',
  matKhau: ''
})

const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const handleRegister = async (): Promise<void> => {
  error.value = ''
  
  // Kiểm tra mật khẩu khớp
  if (registerData.value.matKhau !== confirmPassword.value) {
    error.value = 'Mật khẩu nhập lại không khớp!'
    return
  }

  // Kiểm tra độ dài mật khẩu
  if (registerData.value.matKhau.length < 6) {
    error.value = 'Mật khẩu phải có ít nhất 6 ký tự!'
    return
  }

  loading.value = true
  
  try {
    const result = await authService.register(registerData.value)
    
    if (result.success) {
      alert('Đăng ký thành công! Vui lòng đăng nhập.')
      router.push('/login')
    } else {
      error.value = result.message || 'Đăng ký thất bại!'
    }
  } catch (err) {
    error.value = 'Có lỗi xảy ra trong quá trình đăng ký!'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.register-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.register-card h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.register-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.btn-register {
  width: 100%;
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 1rem;
}

.btn-register:hover:not(:disabled) {
  background: #218838;
}

.btn-register:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.login-link {
  text-align: center;
}

.login-link p {
  margin: 0;
  color: #666;
}

.link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}
</style>
