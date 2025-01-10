export default {
  path: ':collection',
  component: () => import('./CollectionLayout.vue'),
  children: [
    {
      path: '',
      name: 'collection-index',
      component: () => import('./CollectionView.vue'),
    },
  ]
}