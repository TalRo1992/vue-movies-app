<template>
    <div class="movie-details" v-if="movie">
        <a :href="movie.homepage" target="_blank" v-if="movie.homepage">
            <div class="movie-image"
                :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')` }"></div>
        </a>
        <div class="movie-info">
            <h1>{{ movie.title }}</h1>
            <p class="release-date">Release Date: {{ movie.release_date }}</p>
            <p class="overview">{{ movie.overview }}</p>
            <div class="genres">
                <span v-for="genre in movie.genres" :key="genre.id" class="genre">{{ genre.name }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchMovieDetails } from '@/services/api';
import { Movie } from '@/types/types';

export default defineComponent({
    setup() {
        const movie = ref<Movie | null>(null);
        const route = useRoute();

        const loadMovieDetails = async (id: number): Promise<void> => {
            movie.value = await fetchMovieDetails(id);
            console.log(movie.value, 'movie.value')
        };

        onMounted(() => {
            const movieId = Number(route.params.id);
            if (!isNaN(movieId)) {
                loadMovieDetails(movieId);
            }
        });

        return { movie };
    },
});
</script>

<style scoped>
.movie-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    max-width: 900px;
    margin: 0 auto;
    gap: 1.5rem;
}

.movie-details a {
    display: contents;
}

.movie-image {
    width: 100%;
    max-width: 270px;
    height: 400px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
}

.movie-info {
    text-align: center;
    padding: 1rem;
}

h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.release-date {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
}

.overview {
    font-size: 1.1rem;
    margin-bottom: 1rem;
}

.genres {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.genre {
    background-color: #f5821e;
    padding: 0.3rem 0.7rem;
    border-radius: 12px;
    font-size: 0.9rem;
}

@media (min-width: 768px) {
    .movie-details {
        flex-direction: row;
        align-items: flex-start;
    }

    .movie-info {
        text-align: left;
        padding-left: 1.5rem;
        flex: 1;
    }

    h1 {
        font-size: 2.5rem;
    }

    .release-date,
    .overview,
    .genre {
        font-size: 1rem;
    }
}

@media (max-width: 600px) {
    /* .movie-image {
        height: 300px;
    } */

    h1 {
        font-size: 1.8rem;
    }

    .release-date,
    .overview {
        font-size: 0.9rem;
    }

    .genre {
        font-size: 0.8rem;
    }
}
</style>