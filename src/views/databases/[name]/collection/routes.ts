export default {
  path: 'collections',
  component: () => import('./CollectionLayout.vue'),
  children: [
    {
      path: '',
      name: 'collections-index',
      component: () => import('./CollectionView.vue'),
    },
  ]
}