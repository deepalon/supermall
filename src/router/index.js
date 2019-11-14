import Vue from 'vue'
import VueRouter from 'vue-router'

import Category from "../views/category/Category";
import Home from "../views/home/Home";
import Shopcar from "../views/shopcar/Shopcar";
import Profile from "../views/profile/Profile";

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/shopcar',
    component: Shopcar
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
