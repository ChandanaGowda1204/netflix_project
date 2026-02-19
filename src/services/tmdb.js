import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const tmdbService = {
  // Get trending movies
  getTrendingMovies: async () => {
    try {
      const response = await api.get('/trending/movie/week');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  // Get popular movies
  getPopularMovies: async () => {
    try {
      const response = await api.get('/movie/popular');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Get top rated movies
  getTopRatedMovies: async () => {
    try {
      const response = await api.get('/movie/top_rated');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  // Get upcoming movies
  getUpcomingMovies: async () => {
    try {
      const response = await api.get('/movie/upcoming');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw error;
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await api.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Search movies
  searchMovies: async (query) => {
    try {
      const response = await api.get('/search/movie', {
        params: { query },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get image URL
  getImageUrl: (path) => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}${path}`;
  },

  // Get backdrop URL
  getBackdropUrl: (path) => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}${path}`;
  },
};
