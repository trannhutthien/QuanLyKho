<template>
  <div class="login-container">
    <div class="login-card">
      <h2>🏢 Warehouse Management</h2>
      <h3>Đăng nhập hệ thống</h3>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Email:</label>
          <input 
            v-model="loginData.email" 
            type="email" 
            required 
            :disabled="loading"
          />
        </div>
        
        <div class="form-group">
          <label>Mật khẩu:</label>
          <input 
            v-model="loginData.matKhau" 
            type="password" 
            required 
            :disabled="loading"
          />
        </div>
        
        <div v-if="error" class="error">{{ error }}</div>
        
        <button type="submit" :disabled="loading" class="login-btn">
          {{ loading ? '⏳ Đang đăng nhập...' : '🔑 Đăng nhập' }}
        </button>
        
        <div class="register-link">
          <p>Chưa có tài khoản? 
            <router-link to="/register">Đăng ký ngay</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore';

// Component xử lý login UI và gọi auth store
const router = useRouter();
const authStore = useAuthStore();

const loginData = ref({
  email: '',
  matKhau: ''
});

const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  
  try {
    const result = await authStore.login(loginData.value);
    
    if (result.success) {
      router.push('/dashboard');
    } else {
      error.value = result.message || 'Đăng nhập thất bại';
    }
  } catch (err) {
    error.value = 'Có lỗi xảy ra trong quá trình đăng nhập';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:hover:not(:disabled) {
  background: #5a6fd8;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #e74c3c;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #fdf2f2;
  border-radius: 5px;
  border-left: 4px solid #e74c3c;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
}

.register-link a {
  color: #667eea;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>