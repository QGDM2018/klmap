import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash',
  // mode: 'history',
  // base: process.env.NODE_ENV === 'production'
  //   ? process.env.VUE_APP_STATICURL
  //   : '/'
})

export default router
