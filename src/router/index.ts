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
      path: '/loicView',
      name: 'loicView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoicView.vue')

    },
    {
      path: '/loicViewcopy',
      name: 'loicViewcopy',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoicViewcopy.vue')

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
      path: '/database',
      name: 'database',
      component: () => import('../views/DataBaseTemplate.vue')
    }

  ]
})

export default router
