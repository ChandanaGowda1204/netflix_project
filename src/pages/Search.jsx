import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { MovieCard } from '../components/MovieCard';
import { Modal } from '../components/Modal';
import { tmdbService } from '../services/tmdb';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    if (query.trim()) {
      const searchMovies = async () => {
        setLoading(true);
        try {
          const results = await tmdbService.searchMovies(query);
          setMovies(results);
        } catch (error) {
          console.error('Error searching movies:', error);
          setMovies([]);
        } finally {
          setLoading(false);
        }
      };

      searchMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  const handleMovieClick = (movie) => {
    setSelectedMovieId(movie.id);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />

      <div className="page-container pt-24">
        {query && (
          <h1 className="mb-6 text-2xl font-bold">
            Search Results for "{query}"
          </h1>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-netflix-red border-t-transparent"></div>
          </div>
        ) : movies.length === 0 && query ? (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-400">No movies found</p>
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleMovieClick}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-400">
              Enter a search query to find movies
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedMovieId && (
        <Modal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
    </div>
  );
};
