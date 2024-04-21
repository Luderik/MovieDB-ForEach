import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
  const { title, original_title, poster_path, vote_average } = movie;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'default-poster.jpg'; // Image par défaut si `poster_path` est `null`

  return (
    <div className="card">
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
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    poster_path: PropTypes.string, // Non requis car il peut être `null`
    vote_average: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;
