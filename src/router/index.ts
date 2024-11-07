import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MovieDetailView from '@/views/MovieDetailView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/movie/:id', name: 'MovieDetail', component: MovieDetailView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
