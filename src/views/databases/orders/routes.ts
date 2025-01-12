import route_order_details from './[id]/routes'

export default {
  path: 'orders',
  component: () => import('./LayoutOrders.vue'),
  children: [
    {
      path: '',
      name: 'orders-index',
      component: () => import('./ViewOrders.vue'),
    },
    route_order_details
  ],
}