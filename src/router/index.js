import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/map'
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/map.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
