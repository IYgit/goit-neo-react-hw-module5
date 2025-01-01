import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation(); // Отримання поточного місця
  console.log('MoviesList: Location state:', location.state);

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: '/movies' }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
