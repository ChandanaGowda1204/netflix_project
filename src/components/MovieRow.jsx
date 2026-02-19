import { useState, useEffect } from 'react';
import { MovieCard } from './MovieCard';

export const MovieRow = ({ title, fetchFunction, onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFunction();
        setMovies(data);
      } catch (err) {
        setError(err.message);
        console.error(`Error loading ${title}:`, err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [fetchFunction, title]);

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        <div className="flex gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-[300px] w-[200px] animate-pulse rounded-lg bg-zinc-800"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">{title}</h2>
        <p className="text-red-400">Error loading movies: {error}</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={onMovieClick || (() => {})} />
        ))}
      </div>
    </div>
  );
};
