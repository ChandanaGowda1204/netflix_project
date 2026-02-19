import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { MovieRow } from '../components/MovieRow';
import { Modal } from '../components/Modal';
import { tmdbService } from '../services/tmdb';

export const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHeroMovie = async () => {
      try {
        const movies = await tmdbService.getTrendingMovies();
        if (movies && movies.length > 0) {
          setHeroMovie(movies[0]);
        }
      } catch (error) {
        console.error('Error loading hero movie:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHeroMovie();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovieId(movie.id);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  const backdropUrl = heroMovie?.backdrop_path
    ? tmdbService.getBackdropUrl(heroMovie.backdrop_path)
    : null;

  return (
    <div className="min-h-screen bg-netflix-dark">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-netflix-red border-t-transparent"></div>
          </div>
        ) : heroMovie && backdropUrl ? (
          <>
            <div className="absolute inset-0">
              <img
                src={backdropUrl}
                alt={heroMovie.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-16 md:px-8 lg:px-16">
              <div className="max-w-2xl">
                <h1 className="mb-4 text-4xl font-bold md:text-6xl">
                  {heroMovie.title}
                </h1>
                <p className="mb-6 line-clamp-3 text-lg text-gray-300 md:line-clamp-none">
                  {heroMovie.overview}
                </p>
                <button
                  onClick={() => handleMovieClick(heroMovie)}
                  className="btn-primary flex items-center gap-2 text-lg"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Play
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-400">No featured movie available</p>
          </div>
        )}
      </div>

      {/* Movie Rows */}
      <div className="page-container pt-8">
        <MovieRow
          title="Trending Now"
          fetchFunction={tmdbService.getTrendingMovies}
          onMovieClick={handleMovieClick}
        />
        <MovieRow
          title="Popular Movies"
          fetchFunction={tmdbService.getPopularMovies}
          onMovieClick={handleMovieClick}
        />
        <MovieRow
          title="Top Rated"
          fetchFunction={tmdbService.getTopRatedMovies}
          onMovieClick={handleMovieClick}
        />
        <MovieRow
          title="Upcoming"
          fetchFunction={tmdbService.getUpcomingMovies}
          onMovieClick={handleMovieClick}
        />
      </div>

      {/* Modal */}
      {selectedMovieId && (
        <Modal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
    </div>
  );
};
