<script setup lang="ts">
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const activePage = ref(2)

function pagination(current = 1, total = 10, range = 5) {
  // Calculate the range for pagination
  const halfRange = Math.floor(range / 2);
  let start = Math.max(1, current - halfRange);
  let end = Math.min(total, current + halfRange);

  // Adjust the start if we have fewer than 'range' pages available
  if (end - start + 1 < range) {
    if (start === 1) {
      end = Math.min(total, start + range - 1);
    } else {
      start = Math.max(1, end - range + 1);
    }
  }

  // Return an array of page numbers
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
const totalPages = ref(10)
const pages = pagination(activePage.value, totalPages.value)

function assingActivePage() {
  const page = route?.query?.page
  activePage.value = page ? Number(page) : 1
}

watchEffect(assingActivePage)
watch(() => route.query, assingActivePage)
</script>

<template>
  <div class="flex justify-center font-medium bg-white py-6">
    <div class="flex items-center gap-2">
      <button @click="() => {
        const target = activePage > 1 ? (activePage - 1).toString() : (1).toString()
        router.push({ query: { page: target } })
      }" class="px-4 py-2 bg-gray-200 text-sm rounded-lg hover:bg-gray-300">
        <FontAwesomeIcon :icon="faAngleLeft" />
      </button>
      <template v-for="(page, index) in pages" :key="index">
        <button @click="() => {
          router.push({ query: { page: page.toString() } })
        }" class="px-4 py-2 bg-gray-200 text-sm rounded-lg"
          :class="page == activePage ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'">{{ page }}</button>
      </template>
      <button @click="() => {
        if (activePage < pages.length) {
          const target = (activePage + 1).toString()
          router.push({ query: { page: target } })
        }
      }" class="px-4 py-2 bg-gray-200 text-sm rounded-lg hover:bg-gray-300">
        <FontAwesomeIcon :icon="faAngleRight" />
      </button>
    </div>
  </div>
</template>