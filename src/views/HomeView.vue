<template>
    <div>
      <h1>Top Popular Movies</h1>
      <MovieList />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import MovieList from '@/components/MovieList.vue';
  
  export default defineComponent({
    components: {
      MovieList,
    },
  });
  </script>
  