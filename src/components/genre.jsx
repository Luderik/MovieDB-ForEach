import { useState, useEffect } from 'react';

const fetchGenres = async (apiKey, urlBase) => {
  const url = `${urlBase}/genre/movie/list?language=fr-FR&api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.genres;
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [currentPage] = useState(1);
  const [genres, setGenres] = useState([]); // Stocker les genres
  const [selectedGenre, setSelectedGenre] = useState(null); // Stocker le genre sélectionné

  const apiKey = "2064b486f6100c93a5d3208db08639f6";
  const urlBase = `https://api.themoviedb.org/3`;


  useEffect(() => {
    const fetchAndSetGenres = async () => {
      const genreList = await fetchGenres(apiKey, urlBase);
      setGenres(genreList);
    };

    fetchAndSetGenres();
  }, [apiKey, urlBase]);

  useEffect(() => {
    const fetchData = async () => {
      const genreFilter = selectedGenre ? `&with_genres=${selectedGenre}` : '';
      const url = `${urlBase}/discover/movie?language=fr-FR&page=${page}&api_key=${apiKey}${genreFilter}`;
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    };

    fetchData();
  }, [page, selectedGenre, urlBase]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setPage(1);
  };

  return (
    <div>
      <div>
        <label htmlFor="genre-select">Filtrer par genre:</label>
        <select
          id="genre-select"
          onChange={(e) => handleGenreChange(parseInt(e.target.value))}
          value={selectedGenre || ''}
        >
          <option value="">Tous les genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="movies">
        {movies.map((movie) => (
          <article key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={`Affiche du film ${movie.title}`}
            />
            <div className="desc">
              <h2>{movie.title}</h2>
            </div>
          </article>
        ))}
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
    </div>
  );
};

export default Movies;
