import React, { useState } from 'react';
import { fetchMoviesByQuery } from '../../api/moviesApi';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = e => {
    e.preventDefault();
    fetchMoviesByQuery(query).then(setMovies);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
