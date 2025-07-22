import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { StartupService } from './infrastructure/services/StartupService';
import { useAuthStore } from './presentation/stores/authStore';

// Entry point - khởi tạo app với database connection
async function initializeApp() {
  try {
    // Bước 1: Initialize database connection
    await StartupService.initialize();
    
    // Bước 2: Create Vue app
    const app = createApp(App);
    const pinia = createPinia();
    
    app.use(pinia);
    app.use(router);
    
    // Bước 3: Initialize auth state
    const authStore = useAuthStore();
    authStore.initializeAuth();
    
    // Bước 4: Mount app
    app.mount('#app');
    
    console.log('🎉 Vue app mounted successfully!');
    
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>❌ Lỗi khởi động ứng dụng</h1>
        <p>Không thể kết nối tới database. Vui lòng kiểm tra lại cấu hình.</p>
        <pre>${error}</pre>
      </div>
    `;
  }
}

// Start the application
initializeApp();

