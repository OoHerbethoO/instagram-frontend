import { AppRoutes } from './../constants/routes.constant'
import { createRouter, createWebHistory } from 'vue-router'
import Root from '../views/Root.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: AppRoutes.HOME,
      name: 'home',
      component: Root,
      children: [
        {
          name: 'Dashboard',
          path: '/',
          component: () => import('../views/private/Dashboard.vue'),
          props: true,
        },
        {
          name: 'Profile',
          path: `${AppRoutes.PROFILE}/:id`,
          component: () => import('../views/private/Profile.vue'),
          props: true,
        },
        {
          name: 'Settings',
          path: `${AppRoutes.SETTINGS}`,
          component: () => import('../views/private/Settings.vue'),
          props: true,
        },
      ],
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
