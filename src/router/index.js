import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/layout',
    component: () => import('@/views/layout'),
    redirect: '/layout/home',
    children: [
      { path: 'home', component: () => import('@/views/home') },
      { path: 'information', component: () => import('@/views/information') },
      { path: 'findhouse', component: () => import('@/views/findhouse') },
      { path: 'my', component: () => import('@/views/my') }
    ]
  },
  { path: '/login', component: () => import('@/views/login') }
]

const router = new VueRouter({
  routes
})

export default router
