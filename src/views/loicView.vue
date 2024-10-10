
<script lang="ts">

export default {
  data(){
    return {
    total:10,
  };
},


methods: {
  inc() {
    this.total++;
  },
  initDatabase(){},
  fetchDatabase(){}
}
}



</script>

<template>
    <h1>This is an Loïc page</h1>
    <p>Counter: {{total}}</p>
    <button type="button" role="button" @click="inc">+1</button>
  
</template>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
