import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../../api/moviesApi';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies().then(setMovies);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Popular Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
