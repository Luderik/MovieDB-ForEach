import { Link } from 'react-router-dom';

const NavigationMenu = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/AllMovies">Tous les films</Link></li>
        <li><Link to="/genre">Films d&apos;action</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
