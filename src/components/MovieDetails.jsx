import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MovieDetails = () => {
  const { movieId } = useParams(); // Récupération de l'ID du film depuis l'URL
  const [movie, setMovie] = useState(null); // État pour stocker les détails du film

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=2064b486f6100c93a5d3208db08639f6&language=fr-FR`
      );
      const data = await response.json();
      setMovie(data); // Mise à jour des détails du film
    };

    fetchMovieDetails();
  }, [movieId]); // Utilisation de movieId comme dépendance

  if (!movie) {
    return <p>Chargement des détails...</p>; // Indicateur de chargement
  }

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`Affiche du film ${movie.title}`}
      />
      <p>{movie.overview}</p>
      <p><strong>Date de sortie :</strong> {movie.release_date}</p>
      <p><strong>Note :</strong> {movie.vote_average}/10</p>
    </div>
  );
};

export default MovieDetails;
