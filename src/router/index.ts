import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
        path: '/project',
        name: 'projects',
        component: ProjectView
    },{
        path: '/project/:id',
        name: 'project',
        component: () => import('../views/ProjectDetailView.vue')
    },{
        path: '/join',
        name: 'join',
        component: () => import('../views/JoinView.vue')
    }
  ]
})

export default router
