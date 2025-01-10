<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const collection = ref()
const route = useRoute();
const coll = route?.params?.collection
collection.value = Array.isArray(coll) ? coll[0] : coll
</script>

<template>
  <div class="bg-white rounded-t-lg px-3 py-1">
    <span class="font-semibold text-lg">{{ collection }}</span>
  </div>
</template>