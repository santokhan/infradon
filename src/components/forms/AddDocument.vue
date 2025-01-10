<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import PouchDB from 'pouchdb-browser';

const name = ref('');
const content = ref('');
const image = ref<File | null>(null);
const emit = defineEmits(['close'])

const doSubmit = async (e) => {
  e.preventDefault();
  try {
    const db = new PouchDB('mydb')

    const newDoc = {
      _id: crypto.randomUUID(),
      name: name.value,
      content: content.value,
      image: image.value,
    };

    await db.put(newDoc);
    console.log('Document saved', newDoc);

    // Reset form fields
    name.value = '';
    content.value = '';
    image.value = null;

    emit('close');
  } catch (error) {
    console.error('Error saving document:', error);
  }
};

const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    image.value = input.files[0];
  }
};

// // Create reactive variables to store the database and the document
// const db = ref(null);
// const doc = ref(null);
// // Set up the database when the component is mounted
// onMounted(() => {
//   db.value = new PouchDB('mydb');
// });
// const getDoc = async () => {
//   if (!db.value) return
//   try {
//     const retrievedDoc = await db.value.get('f47fe9e8-cd94-4943-904e-6e13d3d36477');
//     doc.value = retrievedDoc;
//     console.log('Retrieved document:', retrievedDoc);
//   } catch (error) {
//     console.error('Error getting document:', error);
//   }
// };
// watchEffect(getDoc)
</script>

<template>
  <section class="py-4 flex justify-center">
    <form @submit="doSubmit" class="p-4 space-y-4 w-full max-w-xl border rounded-lg bg-white mt-4">
      <div class="flex flex-col gap-1">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required class="default" />
      </div>

      <div class="flex flex-col gap-1">
        <label for="content">Content:</label>
        <textarea id="content" v-model="content" rows="4" required class="default"></textarea>
      </div>

      <div class="flex flex-col gap-1">
        <label for="image">Image:</label>
        <input type="file" id="image" @change="handleImageChange" accept="image/*" class="default" />
      </div>

      <button type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">Submit</button>
    </form>
  </section>
</template>
