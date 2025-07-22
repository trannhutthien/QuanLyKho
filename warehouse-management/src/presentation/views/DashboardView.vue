<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>🏢 Dashboard - Quản Lý Kho Hàng</h1>
      <div class="user-info">
        <div class="user-details">
          <span class="welcome">Xin chào: <strong>{{ authStore.user?.hoTen }}</strong></span>
          <span class="role">{{ getRoleText(authStore.user?.vaiTro) }}</span>
        </div>
        <button @click="handleLogout" class="logout-btn">
          🚪 Đăng xuất
        </button>
      </div>
    </header>

    <main class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>📦 Tổng sản phẩm</h3>
          <p class="stat-number">{{ stats.products }}</p>
        </div>
        
        <div class="stat-card">
          <h3>🏪 Kho hàng</h3>
          <p class="stat-number">{{ stats.warehouses }}</p>
        </div>
        
        <div class="stat-card">
          <h3>📥 Phiếu nhập</h3>
          <p class="stat-number">{{ stats.imports }}</p>
        </div>
        
        <div class="stat-card">
          <h3>📤 Phiếu xuất</h3>
          <p class="stat-number">{{ stats.exports }}</p>
        </div>
      </div>

      <div class="quick-actions">
        <h2>⚡ Thao tác nhanh</h2>
        <div class="action-buttons">
          <button class="action-btn primary">📦 Quản lý sản phẩm</button>
          <button class="action-btn secondary">📥 Tạo phiếu nhập</button>
          <button class="action-btn secondary">📤 Tạo phiếu xuất</button>
          <button class="action-btn info">📊 Báo cáo tồn kho</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

// Dashboard component hiển thị thông tin user và stats
const authStore = useAuthStore();
const router = useRouter();

const stats = ref({
  products: 0,
  warehouses: 0,
  imports: 0,
  exports: 0
});

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

const getRoleText = (role?: string): string => {
  switch (role) {
    case 'admin': return '👑 Quản trị viên';
    case 'user': return '👤 Người dùng';
    default: return '👤 Người dùng';
  }
};

const loadStats = async () => {
  // TODO: Load actual stats from API
  stats.value = {
    products: 150,
    warehouses: 3,
    imports: 45,
    exports: 32
  };
};

onMounted(() => {
  loadStats();
});
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f8f9fa;
}

.dashboard-header {
  background: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.welcome {
  font-size: 1rem;
  color: #333;
}

.role {
  font-size: 0.875rem;
  color: #666;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: #c82333;
}

.dashboard-content {
  padding: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-card h3 {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.quick-actions {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.action-btn {
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn.primary {
  background: #007bff;
  color: white;
}

.action-btn.secondary {
  background: #6c757d;
  color: white;
}

.action-btn.info {
  background: #17a2b8;
  color: white;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
</style>
