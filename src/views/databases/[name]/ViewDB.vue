<script setup lang="ts">
// @ts-nocheck
import { ref, onMounted } from 'vue';
import PouchDB from 'pouchdb-browser';

// Create reactive variables to store the database and the document
const db = ref(null);
const doc = ref(null);

// Set up the database when the component is mounted
onMounted(() => {
  db.value = new PouchDB('mydb');
});

// Method to save a document
const saveDoc = async () => {
  try {
    const newDoc = {
      _id: 'testdoc',
      title: 'My First PouchDB Document',
    };
    await db.value.put(newDoc);
    console.log('Document saved');
  } catch (error) {
    console.error('Error saving document:', error);
  }
};

// Method to retrieve a document
const getDoc = async () => {
  try {
    const retrievedDoc = await db.value.get('testdoc');
    doc.value = retrievedDoc;
    console.log('Retrieved document:', retrievedDoc);
  } catch (error) {
    console.error('Error getting document:', error);
  }
};

// import useParams from '@/hooks/useParams';
// const params = useParams()
// const database = params.database
</script>

<template>
  <div>
    <button @click="saveDoc">Save Document</button>
    <button @click="getDoc">Get Document</button>
    <p v-if="doc">Document: {{ doc }}</p>
  </div>
</template>

<style scoped>
button {
  margin: 5px;
}
</style>