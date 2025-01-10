<script setup lang="ts">
// @ts-ignore
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// @ts-ignore
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import CollectionsBar from './collections/CollectionsBar.vue';
import { ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const databases: string[] = ["my_database", "my_database2"];
const expand = ref("")
const route = useRoute()

function assignExpand() {
  const database = route?.params?.database
  expand.value = Array.isArray(database) ? database[0] : database
}
watchEffect(assignExpand)
watch(() => route.params, assignExpand)
</script>

<template>
  <aside class="w-64 shrink-0 bg-gray-800 text-white h-full py-4 space-y-4" :style="{ height: 'calc(100svh - 64px)' }">
    <div class="px-4 font-semibold text-lg">Databases</div>
    <nav class="px-4 space-y-1">
      <template v-for="(item, index) in databases" :key="index">
        <RouterLink :to="`/databases/${item}`"
          class="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          :class="{ 'bg-gray-600': expand == item }" @click="() => expand = expand ? '' : item">
          <FontAwesomeIcon :icon="faCaretRight" class="transition-all" :class="{ 'rotate-90': expand == item }" />
          {{ item }}
        </RouterLink>
        <CollectionsBar :db="expand" v-if="expand == item" />
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