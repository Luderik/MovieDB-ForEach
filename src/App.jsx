import { useState, useEffect } from 'react';
import SearchBar from './components/Search';
import MovieCard from './components/MovieCard';
import './App.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const siteTitle = 'Movie Search';
  const authorName = 'Cédric HUET';
  const apiKey = '2064b486f6100c93a5d3208db08639f6';
  const urlBase = 'https://api.themoviedb.org/3';

  const fetchMovies = async (page, query = '') => {
    setIsLoading(true);
    try {
      const endpoint = query
        ? `${urlBase}/search/movie?query=${query}&language=fr-FR&page=${page}&api_key=${apiKey}`
        : `${urlBase}/discover/movie?language=fr-FR&page=${page}&api_key=${apiKey}`;
      const response = await fetch(endpoint);
      const data = await response.json();
  
      const moviesWithDefaults = (data.results || []).map((movie) => ({
        ...movie,
        poster_path: movie.poster_path || 'default-poster.jpg', // valeur par défaut si `poster_path` est `null`
      }));
  
      setMovies(moviesWithDefaults.slice(0, 16));
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error('Erreur lors du fetch:', error);
      setMovies([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleSearch = (query) => {
    setHasSearched(true);
    setCurrentPage(1);
    fetchMovies(1, query);
  };

  useEffect(() => {
    if (hasSearched) {
      fetchMovies(currentPage);
    }
  }, [currentPage, hasSearched]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="main-container">
      <header className="header">
        <img src="Movie-Logo.png" alt="Logo" className="logo-image" />
        <h1 className="logo">Movie Search</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {isLoading ? (
        <p>Chargement...</p>
      ) : hasSearched && movies.length === 0 ? (
        <p>Aucun résultat.</p>
      ) : (
        hasSearched && (
          <section className="movie-results">
            <div className="movies">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  Précédent
                </button>
                <span className="pagination-current">Page {currentPage} de {totalPages}</span>
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  Suivant
                </button>
              </div>
            )}
          </section>
        )
      )}

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} - {authorName} - {siteTitle}</p>
      </footer>
    </div>
  );
};

export default Movies;
