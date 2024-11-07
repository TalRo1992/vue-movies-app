<template>
    <div>
        <SearchInput @search="handleSearch" @select="handleSelect" :isLoading="searchLoading" :results="searchResults" />
        <div class="movie-list">
            <div class="movies-container">
                <div v-for="movie in movies" :key="movie.id">
                    <MovieListItem :movie="movie" @click="selectMovie(movie.id)" />
                </div>
            </div>
            <LoadingSpinner v-if="loading"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchMovieSearchResults, fetchPopularMovies } from '@/services/api';
import MovieListItem from './MovieListItem.vue';
import SearchInput from './common/SearchInput.vue';
import LoadingSpinner from './common/LoadingSpinner.vue';
import { Movie } from '@/types/types';

export default defineComponent({
    components: { MovieListItem, SearchInput, LoadingSpinner },
    setup() {
        const movies = ref<Movie[]>([]);
        const currentPage = ref<number>(1);
        const loading = ref<boolean>(false);
        const router = useRouter();
        const searchResults = ref<Movie[]>([]);
        const searchLoading = ref<boolean>(false);

        const handleSearch = async (query: string) => {
            if (!query) {
                searchResults.value = [];
                movies.value = []
                loadMovies();
                return;
            }
            searchLoading.value = true;
            const data = await fetchMovieSearchResults(query);
            searchResults.value = data.results;
            searchLoading.value = false;
        };

        const handleSelect = (selectedMovie: Movie) => {
            movies.value = [selectedMovie]; // Display only the selected movie
        };

        const loadMovies = async (): Promise<void> => {
            loading.value = true;
            const newMovies: Movie[] = await fetchPopularMovies(currentPage.value);
            movies.value = [...movies.value, ...newMovies];
            loading.value = false;
        };

        const handleScroll = (): void => {
            if(searchResults.value.length > 0) return
            const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100;
            if (bottomOfWindow && !loading.value) {
                currentPage.value += 1;
                loadMovies();
            }
        };

        const selectMovie = (id: number): void => {
            router.push(`/movie/${id}`);
        };

        onMounted(() => {
            loadMovies();
            window.addEventListener('scroll', handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return { movies, searchResults, searchLoading, loading, selectMovie, handleSearch, handleSelect };
    },
});
</script>

<style scoped>
.movie-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
}

.movies-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

p {
    text-align: center;
    font-size: 1rem;
    color: white;
}
</style>