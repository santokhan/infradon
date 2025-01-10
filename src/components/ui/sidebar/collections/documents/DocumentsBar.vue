<script setup lang="ts">
// @ts-ignore
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// @ts-ignore
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

const collection = "product_collection";

function getDocuments(db: string = "database1"): string[] | null {
  const documents: Record<string, string[]> = {
    "my_databse": [
      "product_collection",
      "blogs_collection",
    ],
  };

  if (typeof db !== 'string' || !(db in documents)) {
    return null;
  }

  return documents[db];
}

const documents = getDocuments(collection[0])
</script>

<template>
  <div class="px-4 space-y-2">
    <template v-for="(db, index) in documents" :key="index">
      <RouterLink :to="`/${db}`"
        class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
        :class="{ 'bg-gray-600': db === collection[0] }">
        <FontAwesomeIcon :icon="faCaretRight" />
        {{ db }}
      </RouterLink>
    </template>
  </div>
</template>

<style scoped>
aside {
  transition: all 0.3s ease;
}

aside:hover {
  background-color: #2d2d2d;
}
</style>