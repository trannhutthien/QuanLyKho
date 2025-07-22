import type { RouteRecordRaw } from 'vue-router'

// Lazy loading components
const LoginView = () => import('../presentation/views/auth/LoginView.vue')
const DashboardView = () => import('../presentation/views/DashboardView.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  }
]
