import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [{
      path: '',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order/list'),
        meta: { title: '订单管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/gallery',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'GalleryList',
        component: () => import('@/views/gallery/list'),
        meta: { title: '画廊管理', icon: 'el-icon-s-help' }
      }
    ]
  },

  {
    path: '/job',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'JobList',
        component: () => import('@/views/job/list'),
        meta: { title: '招聘管理', icon: 'nested' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
