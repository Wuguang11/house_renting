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
  { path: '/', component: () => import('@/views/login') },
  { path: '/city', component: () => import('@/components/CityList.vue') },
  { path: '/rent/add', component: () => import('@/views/home/components/AddRent.vue') },
  { path: '/map', component: () => import('@/views/map') }
]

const router = new VueRouter({
  routes
})

export default router
