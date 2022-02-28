import { createRouter, createWebHistory } from 'vue-router'
import login from '../components/login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
