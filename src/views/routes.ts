import routes_databases from './databases/routes';

export default [
  {
    path: '/',
    component: () => import('./LayoutHome.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('./HomeView.vue'),
      },
      routes_databases,
    ]
  },
]