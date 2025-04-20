import {storage} from '../../App';

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const addMovieToFavorites = (movie: any) => {
  try {
    const existingFavorites = getFavoriteMovies();

    const updatedFavorites = [...existingFavorites, movie];
    storage.set('favorites', JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Failed to add movie to favorites:', error);
  }
};

export const removeMovieFromFavorites = (movieId: string | number) => {
  try {
    const existingFavorites = getFavoriteMovies();

    const updatedFavorites = existingFavorites.filter(m => m.id !== movieId);
    storage.set('favorites', JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Failed to remove movie from favorites:', error);
  }
};

export const getFavoriteMovies = (): any[] => {
  const data = storage.getString('favorites');

  return data ? JSON.parse(data) : [];
};

export const isMovieFavorite = (movieId: string | number): boolean => {
  const favorites = getFavoriteMovies();

  return favorites.find(m => m?.id === movieId);
};
