<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { DatabaseService } from '../services/database.service';
import type { DatabaseDocument } from '../types/database.types';

// const remoteURL = "http://admin:Recopy2-Broadways2-Daylong9-Acts0@localhost:5984/newdb"
const remoteURL = "http://admin:admin@localhost:5986/newdb"
const localURL = "newdb"

// Reactive state
const documents = ref<DatabaseDocument[]>([]);
const newDocument = ref({
  title: '',
  content: ''
});
const status = ref<{ message: string; type: 'info' | 'success' | 'error' }>({ message: '', type: 'info' });
const isLoading = ref(false);
const databaseService = ref<any>(null);

// Update status message
const updateStatus = (message: string, type: 'info' | 'success' | 'error') => {
  status.value = { message, type };
};

// Replicate data from remote
const replicate = async () => {
  if (!databaseService.value) return;
  console.log('Calling replicate...');
  await databaseService.value.replicateFromRemote();
  await fetchDocuments();
};

// Initialize database connection
const initializeDatabase = async () => {
  try {
    databaseService.value = new DatabaseService(remoteURL, localURL);
    updateStatus('Trying to connect to database...', 'success');
    await databaseService.value.initialize();
    updateStatus('Connected to database', 'success');
    await replicate();
  } catch (error: any) {
    updateStatus(error.message, 'error');
  }
};

// Fetch documents from the database
const fetchDocuments = async () => {
  if (!databaseService.value) return;
  isLoading.value = true;
  try {
    documents.value = await databaseService.value.getAllDocuments();
    updateStatus(`${documents.value.length} documents loaded`, 'success');
  } catch (error: any) {
    updateStatus(error.message, 'error');
  } finally {
    isLoading.value = false;
  }
};

// Add a new document
const addDocument = async () => {
  if (!newDocument.value.title || !newDocument.value.content) {
    updateStatus('Title and content are required', 'error');
    return;
  }
  if (!databaseService.value) return;

  isLoading.value = true;
  try {
    await databaseService.value.createDocument({
      title: newDocument.value.title,
      content: newDocument.value.content,
      createdAt: new Date().toISOString()
    });

    updateStatus('Document added successfully', 'success');
    newDocument.value.title = '';
    newDocument.value.content = '';
    await fetchDocuments();
  } catch (error: any) {
    updateStatus(error.message, 'error');
  } finally {
    isLoading.value = false;
  }
};

// Delete a document
const deleteDocument = async (id: string) => {
  if (!databaseService.value) return;
  isLoading.value = true;
  try {
    await databaseService.value.deleteDocument(id);
    updateStatus('Document deleted successfully', 'success');
    await fetchDocuments();
  } catch (error: any) {
    updateStatus(error.message, 'error');
  } finally {
    isLoading.value = false;
  }
};

// // Lifecycle hooks
// onMounted(async () => {
//   await initializeDatabase();
// });

onBeforeUnmount(async () => {
  if (databaseService.value) {
    await databaseService.value.close();
  }
});
</script>

<template>
  <div></div>
  <!-- <div class="database-manager p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
    <h1 class="text-3xl font-semibold mb-6 text-center text-gray-800">Database Manager</h1>

    <div v-if="status.message" :class="[
      'px-6 py-4 rounded-lg mb-6 text-center text-sm font-medium',
      {
        'bg-blue-100 border-blue-400 text-blue-700': status.type === 'info',
        'bg-green-100 border-green-400 text-green-700': status.type === 'success',
        'bg-red-100 border-red-400 text-red-700': status.type === 'error'
      }
    ]">
      <p>{{ status.message }}</p>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-xl font-semibold mb-4">Add New Document</h2>
      <form @submit.prevent="addDocument" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input v-model="newDocument.title" type="text"
            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter document title" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Content</label>
          <textarea v-model="newDocument.content"
            class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-blue-500" rows="4"
            placeholder="Enter document content"></textarea>
        </div>

        <button type="submit" :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
          {{ isLoading ? 'Adding...' : 'Add Document' }}
        </button>
      </form>
    </div>

    <div v-if="isLoading" class="flex justify-center my-6">
      <div class="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-500"></div>
    </div>

    <div v-else-if="documents.length > 0" class="space-y-4">
      <h2 class="text-xl font-semibold mb-4">Documents</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="doc in documents" :key="doc._id"
          class="bg-white p-6 rounded-lg shadow-md flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-gray-800 text-lg">{{ doc.title }}</h3>
            <p class="text-gray-600 mt-2">{{ doc.content }}</p>
            <p class="text-sm text-gray-500 mt-3">
              Created: {{ new Date(doc.createdAt).toLocaleString() }}
            </p>
          </div>
          <button @click="() => {
            deleteDocument(doc._id!)
          }" class="text-red-600 hover:text-red-800 mt-4">
            Delete
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8 text-gray-600">No documents found in the database.</div>
  </div> -->
</template>
