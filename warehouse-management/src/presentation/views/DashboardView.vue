<template>
  <div class="dashboard">
    <h1>Dashboard - Quản Lý Kho Hàng</h1>
    <div class="user-info">
      <p>Xin chào: {{ authStore.user?.hoTen }}</p>
      <button @click="handleLogout" class="logout-btn">Đăng xuất</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.dashboard {
  padding: 2rem;
}

.user-info {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #c82333;
}
</style>