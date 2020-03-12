import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
