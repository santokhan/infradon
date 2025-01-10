<script setup lang="ts">
import SidebarComponent from '@/components/ui/sidebar/SidebarComponent.vue';
</script>

<template>
  <div class="flex divide-x overflow-x-hidden">
    <SidebarComponent />
    <div class="p-4 grow">
      <RouterView />
    </div>
  </div>
</template>