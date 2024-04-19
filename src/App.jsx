import { useState, useEffect } from 'react';
import SearchBar from "./components/Search";
import MovieCard from "./components/MovieCard"; // Importez le composant MovieCard
import './App.css'; // Importez le fichier CSS

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const year = new Date().getFullYear(); // Obtenir l'année actuelle

  const siteTitle = "Movie Search";
  const authorName = "Cédric HUET";

  const apiKey = "2064b486f6100c93a5d3208db08639f6";
  const urlBase = `https://api.themoviedb.org/3`;

  useEffect(() => {
    const fetchData = async () => {
      const url = `${urlBase}/discover/movie?language=fr-FR&page=${currentPage}&api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    };

    fetchData();
  }, [currentPage, urlBase, apiKey]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <img src="../public/Movie-Logo.png" alt="Logo" className="logo-image" />
        <h1 className="logo">{siteTitle}</h1>
        <SearchBar />
      </header>

      {/* Section des résultats */}
      <section className="movie-results">
        <div className="movies">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} /> // Utilisez le composant MovieCard pour chaque film
          ))}
        </div>
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-current">Page {currentPage} of {totalPages}</span>
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {year} {authorName} - {siteTitle}</p>
      </footer>
    </div>
  );
};

export default Movies;
