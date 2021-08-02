const autoRoutes = [
  {
    path: '/',
    component: () => import('@/pages/home/home.vue'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue'),
    hidden: true
  },
  {
    path: '/details',
    component: () => import('@/pages/details/details.vue'),
    hidden: true
  },
  {
    path: '*',
    component: () => import('@/pages/404.vue'),
    hidden: true
  }
]


const routes = [
  ...autoRoutes,
]

export default routes
