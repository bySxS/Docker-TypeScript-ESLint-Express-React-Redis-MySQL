import { RootState } from '../index'
import { IMovie } from 'types/movie'

export function countFavoriteMovie (state: RootState): number {
  return state.favouriteMovies.movies.length || 0
}

export function getFavoriteMovie (state: RootState): IMovie[] {
  return state.favouriteMovies.movies
}

export const getByIdFavouriteMovie = (id: number) => (state: RootState): IMovie => {
  return state.favouriteMovies.movies.filter((movie) => movie.id === id)[0]
}
