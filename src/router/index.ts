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
        {
          name: 'Bookmarks',
          path: `${AppRoutes.BOOKMARKS}`,
          component: () => import('../views/private/Bookmarks.vue'),
        },
        {
          name: 'Explore',
          path: `${AppRoutes.EXPLORE}`,
          component: () => import('../views/private/Explore.vue'),
        },
        {
          name: 'Post',
          path: `${AppRoutes.POST}/:id`,
          component: () => import('../views/private/Post.vue'),
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
