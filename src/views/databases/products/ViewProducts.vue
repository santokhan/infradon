<script setup lang="ts">
import TablePagination from '@/components/tables/collection/TablePagination.vue'
import { ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddProduct from '@/components/forms/products/AddProduct.vue'
import PouchDb from 'pouchdb-browser'
import blobToUrl from '@/utils/blob-to-url'
import SearchForm from '@/components/ui/colllection/topbar/SearchForm.vue'
import ActionEdit from '@/components/shared/ActionEdit.vue'
import ActionDelete from '@/components/shared/ActionDelete.vue'
import TableName from '@/components/ui/colllection/TableName.vue'
import EditProduct from '@/components/forms/products/EditProduct.vue'
import PopulateData from '@/components/ui/populatedata/PopulateData.vue'
import ActionView from '@/components/shared/ActionView.vue'

const route = useRoute()
const router = useRouter()
const database = ref<string>('products_db')
const documents = ref<any>({})

async function assignDocuments() {
  if (!database.value) return

  try {
    const db = new PouchDb(database.value)

    const result = await db.allDocs({ include_docs: true })

    documents.value = result

    return result
  } catch (error) {
    console.error(error)
  }
}

watchEffect(async () => {
  await assignDocuments()
})

watch(() => route.params, async () => {
  await assignDocuments()
})

const isAdding = ref(false)
const collectionToEdit = ref<Record<string, any> | null>(null)

async function removeDocument(doc: Record<string, any>) {
  const status = window.confirm('Are you sure you want to delete this document?')
  if (!status) return

  const db = new PouchDb(database.value)

  try {
    if (doc._id) {
      await db.remove({ _id: doc._id, _rev: doc._rev })
      console.log('Document deleted successfully')
    } else {
      console.error('Document ID or revision not found')
    }
  } catch (err) {
    console.error('Error deleting document:', err)
  }
}
</script>

<template>
  <div class="flex items-center justify-start gap-2 rounded-lg">
    <!-- <LimitSelect /> -->
    <!-- <StatusFilter /> -->
    <SearchForm />
    <PopulateData />
    <div class="grow"></div>
    <button type="button" v-if="!isAdding" class="primary" @click="isAdding = !isAdding">Add Document</button>
    <button type="button" v-else class="primary" @click="() => {
      collectionToEdit = null
      isAdding = !isAdding
    }">Close Form</button>
  </div>
  <template v-if="isAdding">
    <template v-if="collectionToEdit">
      <EditProduct :doc="collectionToEdit" @close="collectionToEdit = null" :collection_name="database" />
    </template>
    <template v-else>
      <AddProduct :collection_name="database" @close="async () => {
        try {
          const result = await assignDocuments()
          if (!result) return
          isAdding = false
        } catch (error) {
          console.log(error)
        }
      }" />
    </template>
  </template>

  <div class="mt-4">
    <div class="flex">
      <TableName />
    </div>
    <table v-if="documents" class="default min-w-full table-auto bg-white rounded-lg">
      <thead>
        <tr class="border-b">
          <!-- <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th> -->
          <th>Image</th>
          <th>Name</th>
          <th>Content</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in documents?.rows" :key="item.id" class="border-b hover:bg-gray-50">
          <!-- <td>{{ item.doc?._id }}</td> -->
          <td>
            <template v-if="item.doc?.image">
              <img :src="blobToUrl(item.doc)" class="size-20 aspect-square object-cover rounded-xl border" />
            </template>
          </td>
          <td>{{ item.doc?.name }}</td>
          <td>{{ item.doc?.content }}</td>
          <td>{{ item.doc?.created_at }}</td>
          <td>
            <div class="flex gap-2 items-center">
              <ActionView class="text-blue-500 hover:text-blue-600 mr-2" @click="async () => {
                router.push({ path: `/databases/${route.params.database}/${route.params.collection}/${item.doc._id}` })
              }" />
              <ActionEdit class="text-blue-500 hover:text-blue-600 mr-2" @click="async () => {
                collectionToEdit = item.doc
                isAdding = true
              }" />
              <ActionDelete class="text-red-500 hover:text-red-600" @click="async () => {
                removeDocument(item.doc)
                assignDocuments()
              }" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <TablePagination :total="Math.ceil(documents?.total_rows / 10)" />
  </div>
</template>
