<script setup lang="ts">
import pagination from '@/utils/pagination';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  total: {
    type: Number,
    required: true,
    default: 10
  }
})
const route = useRoute()
const router = useRouter()
const activePage = ref<number>(route.query.page ? Number(route.query.page) : 1)
const pages = ref<number[]>([])

function assingActivePage() {
  const page = route?.query?.page
  activePage.value = page ? Number(page) : 1

  // console.log(activePage.value)
  pages.value = pagination(activePage.value, props.total)
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
        }" class="px-4 py-2 text-sm rounded-lg"
          :class="page == activePage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'">{{ page }}</button>
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