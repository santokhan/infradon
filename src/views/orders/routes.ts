export default {
  path: 'orders',
  component: () => import('./LayoutOrders.vue'),
  children: [
    {
      path: '',
      name: 'database-index',
      component: () => import('./ViewOrders.vue'),
    },
  ],
}