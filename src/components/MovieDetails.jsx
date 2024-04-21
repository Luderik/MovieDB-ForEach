import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MovieDetails = () => {
  const { movieId } = useParams(); // Récupère l'identifiant du film à partir de l'URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
        const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=2064b486f6100c93a5d3208db08639f6&language=fr-FR`
        );
        const data = await response.json();
      setMovie(data); // Mettre à jour l'état avec les détails du film
    };

    fetchMovieDetails(); // Appeler la fonction de récupération des détails
  }, [movieId]); // Dépend de l'identifiant du film

  if (!movie) {
    return <p>Chargement des détails...</p>; // Message pendant le chargement
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
