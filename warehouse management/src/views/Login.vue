<template>
  <div class="login-container">
    <div class="bg-shape"></div>
    <el-card class="login-card" shadow="always">
      <div class="logo">
        <div class="logo-icon">🏬</div>
        <div class="app-name">Quản Lý Kho</div>
      </div>

      <h3 class="title">Đăng nhập</h3>

      <el-form :model="form" ref="loginForm" :rules="rules" label-position="top" class="login-form">
        <el-form-item label="Tên đăng nhập" prop="username">
          <el-input v-model="form.username" placeholder="Nhập tên đăng nhập" clearable autocomplete="username"></el-input>
        </el-form-item>

        <el-form-item label="Mật khẩu" prop="password">
          <el-input v-model="form.password" type="password" placeholder="Nhập mật khẩu" show-password autocomplete="current-password"></el-input>
        </el-form-item>

        <el-form-item class="actions">
          <el-button type="primary" @click="onSubmit" :loading="loading" class="login-btn">Đăng nhập</el-button>
        </el-form-item>
      </el-form>

      <div class="foot">
        <a class="forgot" href="#">Quên mật khẩu?</a>
        <div class="version">v1.0</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'LoginView',
  setup() {
    const form = ref({ username: '', password: '' })
    const loading = ref(false)
    const loginForm = ref(null)
    const rules = {
      username: [{ required: true, message: 'Vui lòng nhập tên đăng nhập', trigger: 'blur' }],
      password: [{ required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' }]
    }

    const onSubmit = () => {
      loginForm.value.validate(valid => {
        if (!valid) return
        loading.value = true
        setTimeout(() => {
          loading.value = false
          // TODO: gọi API đăng nhập
          alert(`Đăng nhập: ${form.value.username}`)
        }, 900)
      })
    }

    return { form, loading, loginForm, rules, onSubmit }
  }
}
</script>

<style scoped>
.login-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f6f9ff 0%, #eef6ff 50%, #f5f7fa 100%);
  padding: 24px;
}

.bg-shape {
  position: absolute;
  inset: -20% -10% auto -10%;
  height: 60%;
  background: radial-gradient(circle at 10% 20%, rgba(99,102,241,0.08), transparent 10%), radial-gradient(circle at 90% 80%, rgba(56,189,248,0.06), transparent 10%);
  pointer-events: none;
}

.login-card {
  width: 420px;
  max-width: 94vw;
  padding: 28px 28px 20px;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(16,24,40,0.08);
  backdrop-filter: blur(4px);
  position: relative;
  z-index: 2;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}
.logo-icon {
  width:48px;
  height:48px;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:24px;
  background:linear-gradient(135deg,#6366f1,#06b6d4);
  color:#fff;
  border-radius:10px;
  box-shadow: 0 6px 18px rgba(99,102,241,0.14);
}
.app-name { font-weight:600; font-size:18px; color:#111827 }

.title { text-align:left; margin: 8px 0 18px; font-size:20px; color:#0f172a }

.login-form .el-form-item { margin-bottom: 14px }
.login-form .el-input__inner { border-radius:8px }

.login-btn { width:100%; padding:10px 12px; border-radius:8px }

.foot { display:flex; justify-content:space-between; align-items:center; margin-top:12px; color:#6b7280 }
.forgot { color:#3b82f6; text-decoration:none; font-size:13px }
.version { font-size:12px }

@media (max-width:420px){
  .login-card{ padding:20px }
  .logo-icon{ width:42px;height:42px }
}
</style>
