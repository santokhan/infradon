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

  console.log(q.value)

  try {
    const db = new PouchDB('product_collection')

    // Ensure the `find` plugin works by creating an index first
    await db.createIndex({
      index: { fields: ['name', 'content'] }
    })

    const results = await db.find({
      selector: {
        name: {
          $regex: q.value
        },
        content: {
          $regex: q.value
        }
      }
    })

    console.log(results)

    // props.assignDocuments(results.docs)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <form class="flex-shrink flex items-center gap-2" @submit.prevent="search">
    <input type="text" placeholder="Search..." class="default w-60" v-model="q" />
    <button type="submit" class="primary">Search</button>
  </form>
</template>
