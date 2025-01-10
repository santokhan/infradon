<script setup lang="ts">
import useParams from '@/hooks/useParams';

const params = useParams()
const collection = params.collection

type Row = {
  id: string;
  name: string;
  content: string;
}

function getDocuments(db: string | string[]): Row[] | null {
  const documents: Record<string, Row[]> = {
    "product_collection": [
      {
        id: "1",
        name: "Product 1",
        content: "This is the content of Product 1.",
      },
    ],
  };

  if (typeof db !== 'string' || !(db in documents)) {
    return null;
  }

  return documents[db];
}

const documents = getDocuments(collection)
</script>

<template>
  <template v-for="(db, index) in documents" :key="index">
    <div class="">
      {{ db }}
    </div>
  </template>
</template>

<style scoped>
aside {
  transition: all 0.3s ease;
}

aside:hover {
  background-color: #2d2d2d;
}
</style>