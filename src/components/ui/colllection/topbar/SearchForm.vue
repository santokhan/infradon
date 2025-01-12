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

let db: any;  // A global variable to store the db instance
const dbName = 'products_db';

// Function to initialize the database
async function initializeDatabase() {
  // Only initialize the database once
  if (!db) {
    const FindDB = PouchDB.plugin(PouchFind);
    db = new FindDB(dbName);

    try {
      // Here we assume the index for 'name' and 'content' already exists
      console.log('Database initialized');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
}

// Search function to query the database
async function search(e: Event) {
  e.preventDefault();

  const searchValue = q.value.trim();
  if (!searchValue) {
    console.error('Search query is empty');
    return;
  }

  try {
    // Initialize the database (ensure it's initialized once)
    await initializeDatabase();

    // Sanitize the input for regex (escape special characters)
    const sanitizedValue = searchValue.replace(/[.*+?^${}()|[\]\\]/ig, '\\$&');

    // Perform the query with case-insensitive regex
    const results = await db.find({
      selector: {
        $or: [
          { name: { $regex: new RegExp(sanitizedValue, 'i') } }, // Case-insensitive regex for 'name'
          { content: { $regex: new RegExp(sanitizedValue, 'i') } } // Case-insensitive regex for 'content'
        ]
      }
    });

    console.log('Query results:', results);
    // props.assignDocuments(results.docs); // Uncomment and use as needed
  } catch (error) {
    console.error('Error occurred during search:', error);
  }
}
</script>

<template>
  <form class="flex-shrink flex items-center gap-2" @submit.prevent="search">
    <input type="text" placeholder="Search..." class="default w-60" v-model="q" />
    <button type="submit" class="primary">Search</button>
  </form>
</template>
