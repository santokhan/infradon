import route_database from './[name]/routes'

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
    route_database
  ]
}