import databases from './databases/routes';

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
      databases,
      {
        path: 'dataBaseTemplate',
        name: 'dataBaseTemplate',
        component: () => import('../views/DataBaseTemplate.vue')
      },
    ]
  },
]