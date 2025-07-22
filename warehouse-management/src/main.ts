import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './router/routes'

// Tạo router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Tạo pinia store
const pinia = createPinia()

// Tạo app
const app = createApp(App)

// Sử dụng plugins
app.use(pinia)
app.use(router)

// Mount app
app.mount('#app')



