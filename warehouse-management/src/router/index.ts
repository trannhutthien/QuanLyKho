import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { authGuard } from './guards';

// Router chính với authentication guards
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Apply auth guard globally
router.beforeEach(authGuard);

export default router;

