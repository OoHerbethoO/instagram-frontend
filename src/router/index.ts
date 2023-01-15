import { useAuth } from '@/hooks/useAuth'
import Cookies from '@/utils/cookies'
import { createRouter, createWebHistory } from 'vue-router'
import Root from '../views/Root.vue'
import { AppRoutes } from './../constants/routes.constant'

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
      name: 'Login',
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: AppRoutes.REGISTER,
      name: 'Register',
      component: () => import('../views/auth/Register.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { authPromise } = useAuth()
  const token = Cookies.getToken()
  const isAuth = await authPromise
  if (to.name === 'Login' || to.name === 'Register') {
    token && isAuth ? next({ name: 'Dashboard' }) : next()
  } else {
    token && isAuth ? next() : next({ name: 'Login' })
  }
})

export default router
