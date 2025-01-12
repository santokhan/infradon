export default {
  path: ':id',
  children: [
    {
      path: '',
      name: 'order-details',
      component: () => import('./ViewOrderDetails.vue'),
    },
  ],
}