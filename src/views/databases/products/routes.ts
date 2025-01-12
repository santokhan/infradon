export default {
  path: 'products',
  component: () => import('./LayoutProducts.vue'),
  children: [
    {
      path: '',
      name: 'products-index',
      component: () => import('./ViewProducts.vue'),
    },
  ],
}