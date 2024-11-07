import axios from 'axios';
import { PaginatedMoviesResponse, Movie } from '@/types/types';

const API_KEY = '4170bf35f7a61b8012d65de6ad644b9b';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

export const fetchPopularMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const response = await api.get<PaginatedMoviesResponse>(`/movie/popular`, { params: { page } });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId: number): Promise<Movie | null> => {
  try {
    const response = await api.get<Movie>(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return null;
  }
};

export const fetchMovieSearchResults = async (query: string): Promise<PaginatedMoviesResponse> => {
    try {
      const response = await api.get<PaginatedMoviesResponse>(`/search/movie`, {
        params: { query },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie results:', error);
      return { page: 1, results: [], total_pages: 0, total_results: 0 };
    }
};
