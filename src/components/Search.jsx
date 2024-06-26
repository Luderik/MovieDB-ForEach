import { useState } from 'react';
import MovieCard from './MovieCard';
import './Search.css';

function SearchBar() {
  const [value, setValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 16;

  function handleChange(event) {
    setValue(event.target.value);
  }

  const searchMovies = async (page = 1) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=2064b486f6100c93a5d3208db08639f6&language=fr-FR&query=${value}&page=${page}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.results.slice(0, ITEMS_PER_PAGE)); // Limiter à 16 éléments par page
      setTotalResults(data.total_results);
      setTotalPages(Math.ceil(totalResults / ITEMS_PER_PAGE));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      searchMovies(newPage);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchMovies(1);
    }
  };

  return (
    <div className="search-bar">
      <div className="input-container">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher un film..."
        />
        <button onClick={() => searchMovies(1)}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>

      <div className="movies-grid"> {/* Affichage en grille pour 16 éléments */}
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(1)}>Première page</button>
          <button onClick={() => handlePageChange(Math.max(1, currentPage - 1))}>Précédent</button>
          <span>Page {currentPage} de {totalPages}</span>
          <button onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}>Suivant</button>
          <button onClick={() => handlePageChange(totalPages)}>Dernière page</button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
