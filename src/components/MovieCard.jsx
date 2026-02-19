export const MovieCard = ({ movie, onClick }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div
      onClick={() => onClick(movie)}
      className="group relative min-w-[200px] cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={movie.title || movie.name}
          className="h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-semibold text-white line-clamp-2">
            {movie.title || movie.name}
          </h3>
          {movie.vote_average && (
            <p className="mt-1 text-xs text-yellow-400">
              ⭐ {movie.vote_average.toFixed(1)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
