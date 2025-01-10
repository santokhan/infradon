import collection_route from './[collection]/routes';

export default {
  path: ':database',
  component: () => import('./LayoutDB.vue'),
  children: [
    {
      path: '',
      name: 'database-index',
      component: () => import('./ViewDB.vue'),
    },
    collection_route
  ],
}