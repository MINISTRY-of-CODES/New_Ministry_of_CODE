import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/member/:id',
      name: 'member',
      component: () => import('../views/MemberDetailView.vue')
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import('../views/ProjectDetailView.vue')
    },
    {
      path: '/project/:pid/:aid',
      name: 'article',
      component: () => import('../views/ArticleView.vue')
    },
    {
      path: '/join',
      name: 'join',
      component: () => import('../views/JoinView.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue')
    },
    {
      path: '/setting/memberdetail',
      name: 'setMemberDetail',
      component: () => import('../views/SetMemberDetail.vue')
    }
  ]
})

export default router
