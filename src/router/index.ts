import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },    
   
    
    {
      path: '/LoicView',
      name: 'loicView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoicView.vue')

    },
    
    {
      path: '/loictest',
      name: 'loictest',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Test.vue')

    },

    {
      path: '/dataBaseTemplate',
      name: 'dataBaseTemplate',
      component: () => import('../views/DataBaseTemplate.vue')
    },

  ]
})

export default router
