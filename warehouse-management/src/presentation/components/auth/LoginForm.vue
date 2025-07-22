<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <div class="form-group">
      <label for="email">Email:</label>
      <input
        id="email"
        v-model="loginData.email"
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
        v-model="loginData.matKhau"
        type="password"
        required
        class="form-control"
        placeholder="Nhập mật khẩu"
      />
    </div>
    
    <div v-if="authStore.error" class="error-message">
      {{ authStore.error }}
    </div>
    
    <button 
      type="submit" 
      :disabled="authStore.loading"
      class="btn-login"
    >
      {{ authStore.loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
    </button>
    
 
    
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

interface LoginData {
  email: string
  matKhau: string
}

const router = useRouter()
const authStore = useAuthStore()

const loginData = ref<LoginData>({
  email: '',
  matKhau: ''
})

const handleLogin = async (): Promise<void> => {
  const result = await authStore.login(loginData.value)
  
  if (result.success) {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
.login-form {
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

.btn-login {
  width: 100%;
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-login:hover:not(:disabled) {
  background: #5a6fd8;
}

.btn-login:disabled {
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

.demo-info {
  margin-top: 1rem;
  padding: 1rem;
  background: #e7f3ff;
  border-radius: 4px;
  font-size: 0.9rem;
}

.demo-info p {
  margin: 0.25rem 0;
}
</style>

