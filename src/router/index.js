import Vue from 'vue'
import VueRouter from 'vue-router'
import Record from '../views/Record.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Record',
    component: Record
  },
  {
    path: '/statistics',
    name: 'Statistics',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Statistics.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
