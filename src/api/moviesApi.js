import axios from 'axios';

// Замініть на свій API_KEY
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmNkZWEzYmNjYjhjZTYzMjY4YTQ3OTZmZjdlN2M5YiIsIm5iZiI6MTczNDM4NDQwNi4xNzUsInN1YiI6IjY3NjA5YjE2NjExNjYxZTEwNDZiZTI1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OaUurXg6qn5y24mwW6inBKfpLVbAKHXJ-50MFIlCJkk';
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Функція для отримання популярних фільмів
export const fetchPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular?language=en-US&page=1`, options);
  return response.data.results;
};

// Функція для пошуку фільмів за ключовим словом
export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};

// Функція для отримання деталей фільму за ID
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}?language=en-US`, options);
    console.log('Fetched movie details:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching movie details:', err);
    throw err;
  }
};


// Функція для отримання акторського складу
export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?language=en-US`, options);
  return response.data.cast;
};

// Функція для отримання оглядів фільму
export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=1`, options);
  return response.data.results;
};
