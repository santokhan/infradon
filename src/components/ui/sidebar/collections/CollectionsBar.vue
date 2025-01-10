<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{ db: string[] | string }>()

function getCollections(db: string[] | string): string[] | undefined {
  if (!db) return;

  const coillections: Record<string, string[]> = {
    "my_database": [
      "product_collection",
      "blogs_collection",
    ],
    "my_database2": [
      "product_collection2",
      "blogs_collection2",
    ],
  };

  const db_name = Array.isArray(db) ? db[0] : db

  if (!(db_name in coillections)) {
    return;
  }

  return coillections[db_name];
}
const collections = getCollections(props.db);
const route = useRoute()
const collection = ref("");

watch(() => route?.params, () => {
  const coll = route?.params?.collection
  collection.value = Array.isArray(coll)? coll[0] : coll
})
</script>

<template>
  <div class="pl-3 space-y-1">
    <template v-for="(item, index) in collections" :key="index">
      <RouterLink :to="`/databases/${props.db}/${item}`"
        class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700 focus:outline-none"
        :class="item == collection ? 'bg-gray-600' : ''">
        {{ item }}
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
