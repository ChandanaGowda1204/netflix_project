import { useState, useEffect } from 'react';
import { tmdbService } from '../services/tmdb';

export const Modal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const loadMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tmdbService.getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError(err.message);
        console.error('Error loading movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);

  if (!movieId) return null;

  const backdropUrl = movie?.backdrop_path
    ? tmdbService.getBackdropUrl(movie.backdrop_path)
    : null;

  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-netflix-gray shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
          aria-label="Close"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {loading && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-netflix-red border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-red-400">Error loading movie: {error}</p>
          </div>
        )}

        {movie && !loading && (
          <>
            {/* Backdrop */}
            {backdropUrl && (
              <div className="relative h-64 w-full">
                <img
                  src={backdropUrl}
                  alt={movie.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-netflix-gray via-transparent to-transparent"></div>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              <div className="flex flex-col gap-4 md:flex-row">
                {/* Poster */}
                {posterUrl && (
                  <div className="flex-shrink-0">
                    <img
                      src={posterUrl}
                      alt={movie.title}
                      className="h-auto w-48 rounded-lg"
                    />
                  </div>
                )}

                {/* Details */}
                <div className="flex-1">
                  <h2 className="mb-2 text-3xl font-bold">{movie.title}</h2>

                  <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
                    {movie.vote_average && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span>{movie.vote_average.toFixed(1)}</span>
                      </div>
                    )}
                    {movie.release_date && (
                      <span className="text-gray-400">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                    )}
                    {movie.runtime && (
                      <span className="text-gray-400">{movie.runtime} min</span>
                    )}
                  </div>

                  {movie.overview && (
                    <div className="mb-4">
                      <h3 className="mb-2 text-lg font-semibold">Overview</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {movie.overview}
                      </p>
                    </div>
                  )}

                  {movie.genres && movie.genres.length > 0 && (
                    <div className="mb-4">
                      <h3 className="mb-2 text-lg font-semibold">Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        {movie.genres.map((genre) => (
                          <span
                            key={genre.id}
                            className="rounded-full bg-zinc-700 px-3 py-1 text-sm"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Play Button (UI only) */}
                  <button className="btn-primary mt-4">
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                    Play
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
