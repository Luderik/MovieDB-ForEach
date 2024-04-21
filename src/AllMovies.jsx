import { useState, useEffect } from 'react';
import { fetchMovies } from './api';
import MovieCard from './components/MovieCard';

const AllMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data.results || []);
    };

    getMovies();
  }, []);

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
};

export default AllMovies;
