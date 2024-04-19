import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
    const { title, original_title, overview, poster_path } = movie;

    return (
        <div className="card">
            <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={`Affiche du film ${title}`} />
            <div className="card-body">
                <h2>{title}</h2>
                <h3><mark>Titre original :</mark> {original_title}</h3>
                <p><strong>Description :</strong> {overview}</p>
            </div>
        </div>
    );
};

// Validation des props
MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        original_title: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired
    }).isRequired
};

export default MovieCard;
