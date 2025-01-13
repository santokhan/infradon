<script setup lang="ts">
import TablePagination from '@/components/tables/collection/TablePagination.vue'
import { ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import AddDocument from '@/components/forms/orders/CreateOrder.vue'
import PouchDb from 'pouchdb-browser'
import ActionDelete from '@/components/shared/ActionDelete.vue'
import EditDocument from '@/components/forms/orders/EditOrder.vue'
import ActionView from '@/components/shared/ActionView.vue'
import ProductPreview from '@/components/ui/orders/ProductPreview.vue'
import OrderSearchForm from '@/components/ui/colllection/topbar/OrderSearchForm.vue'

const route = useRoute()
const database = ref<string>('orders_db')
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

watch(
  () => route.params,
  async () => {
    await assignDocuments()
  }
)

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

function searchOrders(rows: any[]) {
  documents.value = {
    rows: rows.map(row => {
      return { doc: row }
    })
  }
}
</script>

<template>
  <div class="flex items-center justify-start gap-2 rounded-lg">
    <OrderSearchForm :assignDocuments="searchOrders" />
    <div class="grow"></div>
    <button type="button" v-if="!isAdding" class="primary" @click="isAdding = !isAdding">
      Create Order
    </button>
    <button type="button" v-else class="primary" @click="() => {
      collectionToEdit = null
      isAdding = !isAdding
    }
      ">
      Close Form
    </button>
  </div>
  <template v-if="isAdding">
    <template v-if="collectionToEdit">
      <EditDocument :doc="collectionToEdit" @close="collectionToEdit = null" :collection_name="database" />
    </template>
    <template v-else>
      <AddDocument :collection_name="database" @close="async () => {
        try {
          const result = await assignDocuments()

          if (!result) return

          isAdding = false
        } catch (error) {
          console.log(error)
        }
      }
        " />
    </template>
  </template>

  <div class="mt-4">
    <div class="flex">
      <div class="bg-white rounded-t-lg px-3 py-1">
        <span class="font-semibold text-lg">{{ 'Orders' }}</span>
      </div>
    </div>

    <table v-if="documents" class="default min-w-full table-auto bg-white rounded-lg">
      <thead>
        <tr class="border-b">
          <th>Product</th>
          <th>Street Address</th>
          <th>City</th>
          <th>Country</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in documents?.rows" :key="item.id" class="border-b hover:bg-gray-50">
          <td>
            <ProductPreview :product_id="item.doc?.product_id" />
          </td>
          <td>{{ item.doc?.street_address }}</td>
          <td>{{ item.doc?.city }}</td>
          <td>{{ item.doc?.country }}</td>
          <td>{{ item.doc?.created_at }}</td>
          <td>
            <div class="flex gap-2 items-center">
              <ActionView :id="item.doc?._id" class="text-blue-500 hover:text-blue-600 mr-2" />
              <ActionDelete class="text-red-500 hover:text-red-600" @click="async () => {
                removeDocument(item.doc)
                assignDocuments()
              }
                " />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <TablePagination :total="Math.ceil(documents?.total_rows / 10)" />
  </div>
</template>
