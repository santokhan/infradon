<script setup lang="ts">
// @ts-ignore
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// @ts-ignore
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import CollectionsBar from './collections/CollectionsBar.vue';

const databases: string[] = ["my_database"];

function getCollections(db: string = "database1"): string[] | null {
  const collections: Record<string, string[]> = {
    "my_database": [
      "product_collection",
      "blogs_collection",
    ],
  };

  if (typeof db !== 'string' || !(db in collections)) {
    return null;
  }

  return collections[db];
}

const collections = getCollections(databases[0])
</script>

<template>
  <aside class="w-64 shrink-0 bg-gray-800 text-white h-full py-4 space-y-4">
    <div class="px-4 font-semibold text-lg">Databases</div>

    <nav class="px-4 space-y-2">
      <!-- Loop through databases to display them -->
      <template v-for="(db, index) in databases" :key="index">
        <RouterLink :to="`/${db}`"
          class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          :class="{ 'bg-gray-600': db === databases[0] }">
          <FontAwesomeIcon :icon="faCaretRight" />
          {{ db }}
        </RouterLink>
      </template>
      <CollectionsBar />
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