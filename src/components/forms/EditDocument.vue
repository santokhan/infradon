<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import PouchDB from 'pouchdb-browser';
import blobToUrl from '@/utils/blob-to-url';
import toBlob from '@/utils/to-blob';

const props = defineProps({
  doc: {
    type: Object,
    required: true
  }
})
const name = ref(props.doc.name||'');
const content = ref(props.doc.content||'');
const image = ref<File | null>(null);
const emit = defineEmits(['close'])

const doSubmit = async (e) => {
  e.preventDefault();
  if(!props.doc._id) return
  
  try {
    const db = new PouchDB()
    const existingDoc = await db.get(props.doc._id);

    existingDoc.name= name.value
    existingDoc.content= content.value
    existingDoc.image= image.value

    await db.put(existingDoc);
    console.log('Document updated', existingDoc);

    // Reset form fields
    name.value = '';
    content.value = '';
    image.value = null;

    emit('close');
  } catch (error) {
    console.error('Error updating document:', error);
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

      <template v-if="image">
        <div class="flex flex-col gap-1">
          <label for="image">Preview:</label>
          <img v-if="image" :src="blobToUrl({ image: toBlob({ file: image }) })" alt="Preview"
          class="size-20 aspect-square object-cover rounded-xl border"  />
        </div>
      </template>
      <template v-else>
        <div class="flex flex-col gap-1">
          <label for="image">Preview:</label>
          <img v-if="doc.image" :src="blobToUrl({image:doc?.image})" alt="Preview"
          class="size-20 aspect-square object-cover rounded-xl border"  />
        </div>
      </template>

      <button type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">Submit</button>
    </form>
  </section>
</template>