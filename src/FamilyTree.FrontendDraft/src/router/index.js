import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import AdminDashboard from '../views/AdminDashboard'
import ProfilePage from "../views/ProfilePage"
import PhotoPage from "../views/PhotoPage"
import PersonPage from "../views/PersonPage"

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
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/photo/:id',
    component: PhotoPage
  },
  {
    path: '/person',
    component: PersonPage
  }
]

const router = new VueRouter({
  routes
})

export default router
