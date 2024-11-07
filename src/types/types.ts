export interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    homepage?: string;
    overview?: string;
    genres?: Array<{ id: number; name: string }>;
  }
  
  export interface PaginatedMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  