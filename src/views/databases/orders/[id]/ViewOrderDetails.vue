<script setup lang="ts">
import blobToUrl from '@/utils/blob-to-url'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const order = ref<{
  _id: string
  _rev: string
  product_id: string
  product: any
  street_address: string
  city: string
  country: string
} | null>(null)

const route = useRoute()

watchEffect(async () => {
  const params = route.params
  const order_id = Array.isArray(params.id) ? params.id[0] : params.id

  async function getOrderById(order_id: string) {
    try {
      const orders_db = new PouchDB('orders_db')
      const products_db = new PouchDB('products_db') // Assuming products are stored in a separate database

      // Fetch the order document
      const orderDoc: any = await orders_db.get(order_id)

      // Check if the order has a product_id field
      if (orderDoc.product_id) {
        // Fetch the product document using the product_id
        const productDoc = await products_db.get(orderDoc.product_id)
        orderDoc.product = [productDoc] // Wrap productDoc in an array to ensure v-for compatibility
      }

      order.value = orderDoc // Correctly update the reactive reference
    } catch (error) {
      console.error('Error getting order or product:', error)
    }
  }

  if (order_id) {
    await getOrderById(order_id)
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <div class="text-center mb-6">
      <h1 class="text-3xl font-semibold text-gray-800">Order Details</h1>
      <p class="text-lg text-gray-600">Review your order details below</p>
    </div>

    <div class="flex items-center gap-2 mb-4">
      <div class="text-lg font-medium text-gray-800">Order ID:</div>
      <div class="text-lg text-gray-600 font-semibold">#{{ order?._id }}</div>
    </div>

    <div class="mb-6" v-if="order?.product">
      <div v-for="product in order.product" :key="product._id" class="flex items-center space-x-4">
        <img
          :src="blobToUrl({ image: product?.image })"
          class="size-16 aspect-square object-cover rounded-xl border"
        />
        <div class="flex-1">
          <h2 class="text-lg font-semibold text-gray-800">{{ product.name }}</h2>
          <p class="text-gray-600 text-sm">{{ product.description }}</p>
        </div>
      </div>
    </div>

    <div class="mb-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">Shipping Address</h3>
      <div class="space-y-2">
        <p class="text-gray-600"><strong>Street Address:</strong> {{ order?.street_address }}</p>
        <p class="text-gray-600"><strong>City:</strong> {{ order?.city }}</p>
        <p class="text-gray-600"><strong>Country:</strong> {{ order?.country }}</p>
      </div>
    </div>

    <div class="text-center text-sm text-gray-500 mt-6">
      <p>Thank you for your order!</p>
    </div>
  </div>
</template>
