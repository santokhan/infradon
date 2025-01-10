<script setup lang="ts">
// @ts-ignore
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// @ts-ignore
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useRoute } from 'vue-router'; // Import useRoute

// Assuming collection will be passed via route params or default
const route = useRoute();  // Access the current route
const dbName = route.params.dbName || "database1";  // Get dbName from route params (default to "database1")

// Define collections
function getDocuments(db: string = "database1"): string[] | null {
  const documents: Record<string, string[]> = {
    "database1": [
      "product_collection",
      "blogs_collection",
    ],
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

// Get documents based on the route parameter
const documents = getDocuments(dbName);
</script>

<template>
  <div class="px-4 space-y-2">
    <template v-for="(db, index) in documents" :key="index">
      <RouterLink :to="`/${db}`"
        class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
        :class="{ 'bg-gray-600': db === dbName }">
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
