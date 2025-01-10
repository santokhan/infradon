<script setup lang="ts">
const emit = defineEmits(['click'])  
</script>

<template>
  <button class="text-blue-500 hover:text-blue-600" @click="emit('click')">Edit</button>
</template>