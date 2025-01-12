<script setup lang="ts">
const emit = defineEmits(['click'])  
</script>

<template>
  <button class="text-green-500 hover:text-green-600" @click="emit('click')">View</button>
</template>