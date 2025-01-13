<script setup lang="ts">
import { ref, watch, computed, watchEffect } from 'vue'
import PouchDB from 'pouchdb-browser'
import blobToUrl from '@/utils/blob-to-url'

interface Product {
  _id: string
  name: string
  image?: Blob
}

interface City {
  name: string
  country: string
}

interface Country {
  country_code: string
  name: string
}

const products = ref<Product[]>([])
const product_id = ref<string>('')
const street_address = ref<string>('')
const city = ref<string>('')
const country = ref<string>('')
const emit = defineEmits<{
  (e: 'close'): void
}>()

const cities: City[] = [
  { name: 'New York', country: 'US' },
  { name: 'Los Angeles', country: 'US' },
  { name: 'London', country: 'UK' },
  { name: 'Paris', country: 'FR' },
  { name: 'Berlin', country: 'DE' },
  { name: 'Tokyo', country: 'JP' },
  { name: 'Sydney', country: 'AU' }
]

const countries: Country[] = [
  { country_code: 'US', name: 'United States' },
  { country_code: 'UK', name: 'United Kingdom' },
  { country_code: 'FR', name: 'France' },
  { country_code: 'DE', name: 'Germany' },
  { country_code: 'JP', name: 'Japan' },
  { country_code: 'AU', name: 'Australia' },
]

const filteredCities = computed(() => cities.filter((c) => c.country === country.value))

const doSubmit = async (e: Event) => {
  e.preventDefault()
  try {
    const db = new PouchDB('orders_db')
    const newDoc = {
      _id: crypto.randomUUID(),
      product_id: product_id.value,
      street_address: street_address.value,
      city: city.value,
      country: country.value,
      created_at: new Date().toISOString()
    }
    await db.put(newDoc)

    product_id.value = ''
    street_address.value = ''
    city.value = ''
    country.value = ''

    emit('close')
  } catch (error) {
    console.error('Error saving document:', error)
  }
}

const getProducts = async () => {
  try {
    const db = new PouchDB('products_db')
    const result = await db.allDocs({ include_docs: true })
    if (Array.isArray(result.rows)) {
      products.value = result.rows.map((row: any) => row.doc)
    }
  } catch (error) {
    console.error(error)
  }
}

watchEffect(() => {
  getProducts()
})

const selectedBlob = computed(
  () => products.value.find((product) => product._id === product_id.value)?.image
)

watch(country, () => {
  city.value = ''
})
</script>

<template>
  <section class="py-4 flex justify-center">
    <form @submit="doSubmit" class="p-4 space-y-4 w-full max-w-xl border rounded-lg bg-white mt-4">
      <div class="flex flex-col gap-1">
        <label for="product">Product:</label>
        <select id="product" v-model="product_id" required class="default">
          <option value="" disabled>Select a Product</option>
          <option v-for="product in products" :key="product._id" :value="product._id">
            {{ product.name }}
          </option>
        </select>
      </div>

      <div v-if="selectedBlob" class="flex flex-col gap-1">
        <label>Preview:</label>
        <img
          :src="blobToUrl({ image: selectedBlob })"
          alt="Preview"
          class="size-28 rounded-xl border"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label for="street_address">Street Address:</label>
        <textarea
          id="street_address"
          v-model="street_address"
          rows="4"
          required
          class="default"
        ></textarea>
      </div>

      <div class="flex flex-col gap-1">
        <label for="country">Country:</label>
        <select id="country" v-model="country" required class="default">
          <option value="" disabled>Select Country</option>
          <option
            v-for="country in countries"
            :key="country.country_code"
            :value="country.country_code"
          >
            {{ country.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col gap-1">
        <label for="city">City:</label>
        <select id="city" v-model="city" required class="default" :disabled="!country">
          <option value="" disabled>Select City</option>
          <option v-for="city in filteredCities" :key="city.name" :value="city.name">
            {{ city.name }}
          </option>
        </select>
      </div>

      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Submit
      </button>
    </form>
  </section>
</template>
