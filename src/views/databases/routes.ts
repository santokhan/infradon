import database_route from './[name]/routes'

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
    database_route
  ]
}