<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = defineProps<{ id: string }>()

const emit = defineEmits(['click'])  
</script>

<template>
  <RouterLink :to="`/databases/orders/${props.id}`" class="text-green-500 hover:text-green-600" @click="emit('click')">View</RouterLink>
</template>