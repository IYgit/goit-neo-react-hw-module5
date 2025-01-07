// MoviesPage.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../api/moviesApi';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Викликаємо API при зміні параметрів пошуку
  useEffect(() => {
    const searchQuery = searchParams.get('query') || '';
    setQuery(searchQuery);
    if (searchQuery) {
      fetchMoviesByQuery(searchQuery).then(setMovies);
    }
  }, [searchParams]); // Викликається при зміні параметрів

  const handleSearch = e => {
    e.preventDefault();
    setSearchParams({ query }); // Оновлюємо параметри URL
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
