import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
    const { title, original_title, poster_path, vote_average } = movie;


    return (
        <div className="card">
            {/* Afficher l'affiche du film */}
            <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`} // Taille d'image réduite pour une meilleure performance
                alt={`Affiche du film ${title}`}
                className="card-img"
            />

            <div className="card-body">
                {/* Afficher le titre du film */}
                <h2>{title}</h2>

                {/* Afficher le titre original */}
                <h3><mark>Titre original :</mark> {original_title}</h3>

                {/* Afficher la note du film */}
                <p><strong>Note :</strong> {vote_average}/10</p>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        original_title: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired, // Assurez-vous de valider la note du film
    }).isRequired,
};

export default MovieCard;
