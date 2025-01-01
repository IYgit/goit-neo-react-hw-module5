import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../api/moviesApi';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const castData = await fetchMovieCast(movieId);
        setCast(castData);
      } catch (err) {
        setError('Не вдалося завантажити акторський склад.');
      }
    };

    fetchCast();
  }, [movieId]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!cast.length) {
    return <p className={styles.message}>Інформація про акторський склад відсутня.</p>;
  }

  return (
    <ul className={styles.castList}>
      {cast.map((actor) => (
        <li key={actor.cast_id} className={styles.castItem}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : 'https://via.placeholder.com/200x300'
            }
            alt={actor.name}
            className={styles.actorPhoto}
          />
          <p className={styles.actorName}>{actor.name}</p>
          <p className={styles.character}>as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
