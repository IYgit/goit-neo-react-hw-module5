import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/moviesApi';
import styles from './MovieDetailsPage.module.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Зберігаємо поточний шлях до MovieDetailsPage
  const [fromLocation] = useState(location.pathname);

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (err) {
        setError('Не вдалося завантажити інформацію про фільм.');
      }
    };

    fetchDetails();
  }, [movieId]);

  const goBack = () => {
    navigate(fromLocation); // Повертаємося до MovieDetailsPage
  };

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!movie) {
    return <p className={styles.loading}>Завантаження...</p>;
  }

  const { title, overview, genres, poster_path, release_date, vote_average } = movie;

  return (
    <div className={styles.container}>
      <button onClick={goBack} className={styles.goBackButton}>
        Go Back
      </button>

      <div className={styles.details}>
        <img
          src={poster_path ? `${IMAGE_BASE_URL}${poster_path}` : 'https://via.placeholder.com/500x750'}
          alt={title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h1>{title}</h1>
          <p><strong>Release Date:</strong> {release_date}</p>
          <p><strong>Rating:</strong> {vote_average}</p>
          <p><strong>Overview:</strong> {overview}</p>
          <p>
            <strong>Genres:</strong> {genres.map((genre) => genre.name).join(', ')}
          </p>
        </div>
      </div>

      <nav className={styles.subNav}>
        <Link
          to={`/movies/${movieId}/cast`}
          state={{ from: fromLocation }}
          className={styles.link}
        >
          Cast
        </Link>
        <Link
          to={`/movies/${movieId}/reviews`}
          state={{ from: fromLocation }}
          className={styles.link}
        >
          Reviews
        </Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
