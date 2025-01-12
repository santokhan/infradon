<script setup lang="ts">
import { ref } from 'vue'
import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'

const q = ref('')
const props = defineProps({
  assignDocuments: {
    type: Function
  }
})

let db: any
const dbName = 'orders_db'

async function initializeDatabase() {
  if (!db) {
    const FindDB = PouchDB.plugin(PouchFind)
    db = new FindDB(dbName)

    try {
      console.log('Database initialized')
    } catch (error) {
      console.error('Error initializing database:', error)
    }
  }
}

async function search(e: Event) {
  e.preventDefault()

  const searchValue = q.value.trim()
  if (!searchValue) {
    console.error('Search query is empty')
    return
  }

  try {
    await initializeDatabase()

    const sanitizedValue = searchValue.replace(/[.*+?^${}()|[\]\\]/gi, '\\$&')

    const results = await db.find({
      selector: {
        $or: [
          { street_address: { $regex: new RegExp(sanitizedValue, 'i') } },
          { city: { $regex: new RegExp(sanitizedValue, 'i') } },
          { country: { $regex: new RegExp(sanitizedValue, 'i') } }
        ]
      }
    })

    console.log('Query results:', results)
    if(typeof props.assignDocuments === 'function'){
      props.assignDocuments(results.docs)
    }
  } catch (error) {
    console.error('Error occurred during search:', error)
  }
}
</script>

<template>
  <form class="flex-shrink flex items-center gap-2" @submit.prevent="search">
    <input type="text" placeholder="Search..." class="default w-60" v-model="q" />
    <button type="submit" class="primary">Search</button>
  </form>
</template>
