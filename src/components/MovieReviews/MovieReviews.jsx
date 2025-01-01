import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api/moviesApi';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (err) {
        setError('Не вдалося завантажити огляди.');
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!reviews.length) {
    return <p className={styles.message}>Оглядів немає.</p>;
  }

  return (
    <ul className={styles.reviewList}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.reviewItem}>
          <h3 className={styles.author}>Author: {review.author}</h3>
          <p className={styles.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
