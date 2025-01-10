<script setup lang="ts">
const emit = defineEmits(['click'])  
</script>

<template>
  <button class="text-red-500 hover:text-red-600" @click="emit('click')">Delete</button>
</template>