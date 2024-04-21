import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './Movies';
import MovieDetails from './MovieDetails'; // Assurez-vous d'importer le nouveau composant

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Movies />} /> 
        <Route path="/movies/:movieId" element={<MovieDetails />} /> 
      </Routes>
    </Router>
  );
};

export default App;
