import Vue from 'vue'
import VueRouter from 'vue-router'

const Category = () => import('../views/category/Category');
const Home = () => import('../views/home/Home');
const Shopcar = () => import('../views/shopcar/Shopcar');
const Profile = () => import('../views/profile/Profile');
const Detail = () => import('../views/detail/Detail');

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
  },
  {
    path: '/detail/:iid',
    component: Detail
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
