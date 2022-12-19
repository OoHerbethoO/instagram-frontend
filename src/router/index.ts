import { AppRoutes } from '@/constants/routes.constant'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: AppRoutes.HOME,
      name: 'home',
      component: HomeView,
    },
    {
      path: AppRoutes.LOGIN,
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: AppRoutes.REGISTER,
      name: 'register',
      component: () => import('../views/auth/Register.vue'),
    },
  ],
})

export default router
