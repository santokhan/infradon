import routes_collection from './[collection]/routes';
import ViewDB from './ViewDB.vue';

export default {
  path: ':database',
  component: () => import('./LayoutDB.vue'),
  children: [
    {
      path: '',
      name: 'database-index',
      component: ViewDB,
    },
    routes_collection
  ],
}