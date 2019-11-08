import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import AdminDashboard from '../views/AdminDashboard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/admin',
    component: AdminDashboard
  }
]

const router = new VueRouter({
  routes
})

export default router
