import route_products from './products/routes'
import route_orders from './orders/routes'

export default {
  path: 'databases',
  name: 'databases',
  component: () => import('./LayoutDatabases.vue'),
  children: [
    {
      path: '',
      name: 'databases-index',
      component: () => import('./DatabasesView.vue')
    },
    route_products,
    route_orders
  ]
}