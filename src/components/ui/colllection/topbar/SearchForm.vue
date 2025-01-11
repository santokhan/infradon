<script setup lang="ts">
import { ref } from 'vue';

const q = ref('')
const props = defineProps({
  assignDocuments: {
    type: Function,
    // required: true
  }
})

async function search(e: Event) {
  e.preventDefault();

  console.log(q.value)

  // Step 1 Search data from PouchDB
  // Step 2 Asssign documents to the table state

  try {
    const db = new PouchDB('http://admin:admin@localhost:5986/post');

    const results = await db.find({
      selector: {
        title: {
          $regex: q.value
        }
      }
    })

    console.log(results)

    props.assignDocuments(results.docs)

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