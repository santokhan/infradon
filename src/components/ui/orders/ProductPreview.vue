<script setup lang="ts">
import blobToUrl from '@/utils/blob-to-url';
import PouchDb from 'pouchdb-browser';
import { ref, watchEffect } from 'vue';

const product = ref<any>(null)
const props = defineProps({
  product_id: {
    type: String,
    required: true
  }
})

watchEffect(async () => {
  async function getProductById(id: string) {
    try {
      const db = new PouchDb('products_db');
      const product = await db.get(id);
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }
  
  if (!props.product_id) return
  product.value = await getProductById(props.product_id)
})
</script>

<template>
  <div v-if="product" class="flex items-center gap-2">
    <img :src="blobToUrl({ image: product?.image })" class="size-16 aspect-square object-cover rounded-xl border" />
    <div class="font-semibold">{{ product?.name }}</div>
  </div>
</template>