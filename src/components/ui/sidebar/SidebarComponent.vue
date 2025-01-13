<script setup lang="ts">
import { useRoute } from 'vue-router';

const databases: string[] = ["products", "orders"];
const route = useRoute()
</script>

<template>
  <aside class="w-64 shrink-0 bg-gray-800 text-white h-full py-4 space-y-4" :style="{ height: 'calc(100svh - 64px)' }">
    <div class="px-4 font-semibold text-lg">Databases</div>
    <nav class="px-4 space-y-1">
      <template v-for="(item, index) in databases" :key="index">
        <RouterLink :to="`/databases/${item}`"
          class="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 capitalize"
          :class="{ 'bg-gray-600': route.path.endsWith(item) }">
          {{ item }}
        </RouterLink>
      </template>
    </nav>
  </aside>
</template>

<style scoped>
aside {
  transition: all 0.3s ease;
}

aside:hover {
  background-color: #2d2d2d;
}
</style>