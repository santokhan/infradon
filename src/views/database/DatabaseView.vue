<script setup lang="ts">
import SidebarComponent from '@/components/ui/sidebar/SidebarComponent.vue';
import CollectionView from './collection/CollectionView.vue';
</script>

<template>
  <div class="flex divide-x">
    <SidebarComponent />
    <div class="p-4">
      <CollectionView />
    </div>
  </div>
</template>