<script setup lang="ts">
import useParams from '@/hooks/useParams';

const params = useParams()
const database = params.database
</script>

<template>
  <div>
    Database {{ database }}
  </div>
</template>