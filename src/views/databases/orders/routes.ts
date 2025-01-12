export default {
  path: 'orders',
  component: () => import('./LayoutOrders.vue'),
  children: [
    {
      path: '',
      name: 'orders-index',
      component: () => import('./ViewOrders.vue'),
    },
  ],
}