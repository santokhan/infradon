<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import PouchDB from 'pouchdb-browser';
import blobToUrl from '@/utils/blob-to-url';

const products = ref<any[]>([])
const product_id = ref('');
const street_address = ref('');
const city = ref('');
const country = ref('');
const emit = defineEmits(['close'])
const props = defineProps({
  collection_name: {
    type: String,
    required: true
  }
})

const doSubmit = async (e: Event) => {
  e.preventDefault();
  try {
    const db = new PouchDB(props.collection_name)

    const newDoc = {
      // _id: crypto.randomUUID(),
      product_id: product_id.value,
      street_address: street_address.value,
      city: city.value,
      country: country.value
    };

    await db.put(newDoc);
    console.log('Document saved', newDoc);

    // Reset form fields
    product_id.value = '';
    street_address.value = '';
    city.value = '';
    country.value = '';

    emit('close');
  } catch (error) {
    console.error('Error saving document:', error);
  }
};

async function getProducts() {
  try {
    const db = new PouchDB('products')
    const result = await db.allDocs({ include_docs: true })

    if (Array.isArray(result.rows)) {
      products.value = result.rows.map(row => row.doc)
    }
  } catch (error) {
    console.error(error)
  }
}

const blob = products.value.find(product => product._id === product_id.value)?.image

watchEffect(() => {
  getProducts()
})
</script>

<template>
  <section class="py-4 flex justify-center">
    <form @submit="doSubmit" class="p-4 space-y-4 w-full max-w-xl border rounded-lg bg-white mt-4">
      <div class="flex flex-col gap-1">
        <label for="name">Product:</label>
        <select type="text" id="product" v-model="product_id" required class="default">
          <template v-for="product in products" :key="product._id">
            <option :value="product._id">{{ product.name }}</option>
          </template>
        </select>
      </div>
      <template v-if="blob">
        <div class="flex flex-col gap-1">
          <label for="image">Preview:</label>
          <img v-if="blob"
            :src="blobToUrl({ image: blob })"
            alt="Preview" class="size-28 rounded-xl border" />
        </div>
      </template>

      <div class="flex flex-col gap-1">
        <label for="content">Street Address:</label>
        <textarea id="content" v-model="street_address" rows="4" required class="default"></textarea>
      </div>

      <div class="flex flex-col gap-1">
        <label for="image">City:</label>
        <select type="text" id="city" v-model="city" required class="default">
          <option value="City 1">City 1</option>
          <option value="City 2">City 2</option>
        </select>
      </div>

      <div class="flex flex-col gap-1">
        <label for="image">Country:</label>
        <select type="text" id="country" v-model="country" required class="default">
          <option value="country 1">country 1</option>
          <option value="country 2">country 2</option>
        </select>
      </div>

      <button type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">Submit</button>
    </form>
  </section>
</template>
