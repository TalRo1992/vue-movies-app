<template>
    <div class="movie-item" @click="$emit('click')">
      <div class="movie-image" :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')` }"></div>
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.release_date }}</p>
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Movie } from '@/types/types';
  
  export default defineComponent({
    props: {
      movie: {
        type: Object as PropType<Movie>,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .movie-item {
    cursor: pointer;
    text-align: center;
    min-width: 200px;
  }
  
  .movie-image {
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 1.1rem;
    margin: 0;
  }
  
  p {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.2rem;
  }
  </style>
  