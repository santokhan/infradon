export default {
  path: 'products',
  component: () => import('./LayoutProducts.vue'),
  children: [
    {
      path: '',
      name: 'database-index',
      component: () => import('./ViewProducts.vue'),
    },
  ],
}