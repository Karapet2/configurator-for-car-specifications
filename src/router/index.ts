import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'list',
    component: () => import('../views/SpecificationList.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/ManageSpecification.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/ManageSpecification.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
})

export default router
