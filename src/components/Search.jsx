import { useState } from 'react';
import './Search.css';
import MovieCard from './MovieCard'; // Importez le composant MovieCard

function SearchBar() {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState([]);

  function handleChange(event) {
    setValue(event.target.value);
  }

  async function searchMovies() {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2064b486f6100c93a5d3208db08639f6&language=fr-FR&query=${value}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  }

  return (
    <div className="searchBar">
      <div className="inputSearch">
        <input type="text" value={value} onChange={handleChange} />
        <button onClick={searchMovies}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
      <div className="movies">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} /> // Utilisez le composant MovieCard pour chaque film
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
