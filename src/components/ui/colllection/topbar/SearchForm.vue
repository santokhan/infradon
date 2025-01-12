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

PouchDB.plugin(PouchFind)

async function search(e: Event) {
  e.preventDefault()

  const searchValue = q.value.trim()
  if (!searchValue) {
    console.error('Search query is empty')
    return
  }

  try {
    const db = new PouchDB('products_db')

    // Log database info
    const info = await db.info()

    // Create index on name and content fields
    await db.createIndex({
      index: { fields: ['name', 'content'] }
    })

    // Log indexes
    const indexes = await db.getIndexes()

    // Sanitize the input for regex
    const sanitizedValue = searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    // Query the database
    const results = await db.find({
      selector: {
        $or: [{ name: { $regex: sanitizedValue } }, { content: { $regex: sanitizedValue } }]
      }
    })

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
