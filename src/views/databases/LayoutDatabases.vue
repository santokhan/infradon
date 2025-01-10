<script setup lang="ts">
import SidebarComponent from '@/components/ui/sidebar/SidebarComponent.vue';
</script>

<template>
  <div class="flex divide-x">
    <SidebarComponent />
    <div class="p-4">
      <RouterView />
    </div>
  </div>
</template>