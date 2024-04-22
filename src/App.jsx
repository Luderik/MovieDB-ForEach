import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchBar from './components/Search';
import MovieDetails from './components/MovieDetails';
import AllMoviesPage from './components/AllMovies';
import GenrePage from './components/genre';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const apiKey = '2064b486f6100c93a5d3208db08639f6';
  const urlBase = 'https://api.themoviedb.org/3';

  const fetchMovies = useCallback(async (page, query = '') => {
    setIsLoading(true);
    try {
      const endpoint = query
        ? `${urlBase}/search/movie?query=${query}&language=fr-FR&page=${page}&api_key=${apiKey}`
        : `${urlBase}/discover/movie?language=fr-FR&page=${page}&api_key=${apiKey}`;
      const response = await fetch(endpoint);
      const data = await response.json();

      const moviesWithDefaults = (data.results || []).map((movie) => ({
        ...movie,
        poster_path: movie.poster_path || '/default-poster.jpg',
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
  }, [apiKey, urlBase]); // Fixation des dépendances de useCallback

  const handleSearch = (query) => {
    setHasSearched(true);
    setCurrentPage(1);
    fetchMovies(1, query);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
};

  useEffect(() => {
    if (hasSearched) {
      fetchMovies(currentPage);
    }
  }, [currentPage, hasSearched, fetchMovies]); // Utilisation de fetchMovies comme dépendance

  return (
    <Router>
      <div>
        <header>
          <Link to="/">
            <img src="/Movie-Logo.png" alt="Logo" className="logo-image" />
          </Link>
          <h1>Movie Search</h1>
          <SearchBar onSearch={handleSearch} />
        </header>

        <Routes>
          <Route path="/" element={
              hasSearched ? (
                  <section className="movie-results">
                      <div className="movies">
                          {isLoading ? <p>Chargement...</p> : (
                              movies.map((movie) => (
                                  <article key={movie.id}>
                                      <img
                                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                          alt={`Affiche du film ${movie.title}`}
                                      />
                                      <div className="desc">
                                          <h2>{movie.title}</h2>
                                          <h3><mark>Titre original :</mark> {movie.original_title}</h3>
                                          <p><strong>Note :</strong> {movie.vote_average}/10</p>
                                      </div>
                                  </article>
                              ))
                          )}
                      </div>
                      {totalPages > 1 && (
                          <div className="pagination">
                              <button
                                  onClick={() => handlePageChange(currentPage - 1)}
                                  disabled={currentPage <= 1}
                              >
                                  Précédent
                              </button>
                              <span>Page {currentPage} de {totalPages}</span>
                              <button
                                  onClick={() => handlePageChange(currentPage + 1)}
                                  disabled={currentPage >= totalPages}
                              >
                                  Suivant
                              </button>
                          </div>
                      )}
                  </section>
              ) : null
          } />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movies" element={<AllMoviesPage />} />
          <Route path="/genre" element={<GenrePage />} />
          <Route path="*" element={<div>Page non trouvée</div>} />
        </Routes>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} - Cédric HUET - Movie Search</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
