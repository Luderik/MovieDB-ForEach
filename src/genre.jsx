import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMoviesByGenre } from './api';
import MovieCard from './components/MovieCard';

const GenrePage = () => {
  const { genre } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchMoviesByGenre(genre); // Récupérer les films par genre
      setMovies(data.results || []); // Utiliser les résultats ou un tableau vide
    };

    fetchMovies();
  }, [genre]);

  return (
    <div>
      <h2>Films par genre: {genre}</h2>
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
};

export default GenrePage;
