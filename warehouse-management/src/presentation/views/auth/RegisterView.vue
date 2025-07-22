<template>
  <div class="register-container">
    <div class="register-card">
      <h2>🏢 Warehouse Management</h2>
      <h3>Đăng ký tài khoản</h3>
      
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="tenNguoiDung">Họ tên:</label>
          <input
            id="tenNguoiDung"
            v-model="registerData.tenNguoiDung"
            type="text"
            required
            :disabled="loading"
            placeholder="Nhập họ tên"
          />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="registerData.email"
            type="email"
            required
            :disabled="loading"
            placeholder="Nhập email"
          />
        </div>

        <div class="form-group">
          <label for="soDienThoai">Số điện thoại:</label>
          <input
            id="soDienThoai"
            v-model="registerData.soDienThoai"
            type="tel"
            :disabled="loading"
            placeholder="Nhập số điện thoại (tùy chọn)"
          />
        </div>

        <div class="form-group">
          <label for="matKhau">Mật khẩu:</label>
          <input
            id="matKhau"
            v-model="registerData.matKhau"
            type="password"
            required
            :disabled="loading"
            placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Nhập lại mật khẩu:</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            :disabled="loading"
            placeholder="Nhập lại mật khẩu"
          />
        </div>
        
        <div v-if="error" class="error">{{ error }}</div>
        
        <button type="submit" :disabled="loading" class="register-btn">
          {{ loading ? '⏳ Đang đăng ký...' : '📝 Đăng ký' }}
        </button>

        <div class="login-link">
          <p>Đã có tài khoản? 
            <router-link to="/login">Đăng nhập ngay</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../../../application/services/auth/AuthService';

// Component xử lý register UI với validation
const router = useRouter();
const authService = new AuthService();

const registerData = ref({
  tenNguoiDung: '',
  email: '',
  matKhau: '',
  soDienThoai: ''
});

const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');

const handleRegister = async () => {
  error.value = '';
  
  // Client-side validation
  if (registerData.value.matKhau !== confirmPassword.value) {
    error.value = 'Mật khẩu nhập lại không khớp!';
    return;
  }

  if (registerData.value.matKhau.length < 6) {
    error.value = 'Mật khẩu phải có ít nhất 6 ký tự!';
    return;
  }

  loading.value = true;
  
  try {
    const result = await authService.register(registerData.value);
    
    if (result.success) {
      alert('✅ Đăng ký thành công! Vui lòng đăng nhập.');
      router.push('/login');
    } else {
      error.value = result.message || 'Đăng ký thất bại!';
    }
  } catch (err) {
    error.value = 'Có lỗi xảy ra trong quá trình đăng ký!';
  } finally {
    loading.value = false;
  }
};
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
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 450px;
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

.register-btn {
  width: 100%;
  padding: 0.75rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.register-btn:hover:not(:disabled) {
  background: #218838;
}

.register-btn:disabled {
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

.login-link {
  text-align: center;
  margin-top: 1rem;
}

.login-link a {
  color: #667eea;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>


