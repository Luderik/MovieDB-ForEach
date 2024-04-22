import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
  // Obtenir les propriétés nécessaires du film
  const { title, original_title, poster_path, vote_average } = movie;

  // URL de l'affiche, avec une valeur par défaut si elle n'est pas définie
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'default-poster.jpg';

  return (
    <article className="card">
      {/* Afficher l'image de l'affiche du film */}
      <img
        src={posterUrl}
        alt={`Affiche du film ${title}`}
        className="card-img"
      />
      <div className="card-body">
        <h2>{title}</h2>
        <h3>
          <mark>Titre original :</mark> {original_title}
        </h3>
        <p>
          <strong>Note :</strong> {vote_average}/10
        </p>
      </div>
    </article>
  );
};

MovieCard.propTypes = {
  // Définition des types requis pour les propriétés du film
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;
