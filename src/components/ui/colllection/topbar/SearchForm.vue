<script setup lang="ts">
import { ref } from 'vue'
import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'

const q = ref('')
const props = defineProps({
  assignDocuments: {
    type: Function
    // required: true
  }
})


async function search(e: Event) {
  e.preventDefault()

  const searchValue = q.value.trim()
  if (!searchValue) {
    console.error('Search query is empty')
    return
  }

  try {
    PouchDB.plugin(PouchFind);

    const db = new PouchDB('products_db');

    // Log database info
    const info = await db.info();

    // Create index on name and content fields
    await db.createIndex({
      index: { fields: ['name', 'content'] }
    });

    // Log indexes
    const indexes = await db.getIndexes();

    // Sanitize the input for regex (escape special characters)
    const sanitizedValue = searchValue.replace(/[.*+?^${}()|[\]\\]/ig, '\\$&');

    // Query the database with case-insensitive regex
    const results = await db.find({
      selector: {
        $or: [
          { name: { $regex: new RegExp(sanitizedValue, 'i') } }, // Case-insensitive regex for 'name'
          { content: { $regex: new RegExp(sanitizedValue, 'i') } } // Case-insensitive regex for 'content'
        ]
      }
    });

    console.log('Query results:', results)
    // props.assignDocuments(results.docs); // Uncomment and use as needed
  } catch (error) {
    console.error('Error occurred:', error)
  }
}
</script>

<template>
  <form class="flex-shrink flex items-center gap-2" @submit.prevent="search">
    <input type="text" placeholder="Search..." class="default w-60" v-model="q" />
    <button type="submit" class="primary">Search</button>
  </form>
</template>
