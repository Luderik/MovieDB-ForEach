import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchBar from './components/Search';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import AllMoviesPage from './AllMovies';
import GenrePage from './genre';
import NavigationMenu from './components/Navigation';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [siteTitle] = useState("Movie Search");
  const [authorName] = useState("Cédric HUET");

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
        poster_path: movie.poster_path || '/default-poster.jpg',
      }));

      setMovies(moviesWithDefaults.slice(0, 16));
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      console.error('Erreur lors du fetch:', error);
      setMovies([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false); // Correction : pas de virgule avant finally
    }
  };

  const handleSearch = (query) => {
    setHasSearched(true);
    setCurrentPage(1);
    fetchMovies(1, query);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    if (hasSearched) {
      fetchMovies(currentPage);
    }
  }, [currentPage, hasSearched]);

  return (
    <Router>
      <div>
        <header>
          <Link to="/">
            <img src="/Movie-Logo.png" alt="Logo" className="logo-image" />
          </Link>
          <h1>Movie Search</h1>
          <SearchBar onSearch={handleSearch} />
          <NavigationMenu />
        </header>

        <Routes>
          <Route
            path="/"
            element={
              hasSearched ? (
                <section className="movie-results">
                  <div className="movies">
                    {isLoading ? (
                      <p>Chargement...</p>
                    ) : (
                      movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
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
              ) : (
                <AllMoviesPage />
              )
            }
          />
          <Route path="/movies" element={<AllMoviesPage />} />
          <Route path="/genre" element={<GenrePage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<div>Page non trouvée</div>} />
        </Routes>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} - {authorName} - {siteTitle}</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
