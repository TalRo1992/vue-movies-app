<template>
    <div>
      <MovieDetails />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import MovieDetails from '@/components/MovieDetails.vue';
  
  export default defineComponent({
    components: {
      MovieDetails,
    },
  });
  </script>

  