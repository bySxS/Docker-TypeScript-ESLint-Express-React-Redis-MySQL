import { IRootState } from '../index'
import { IMovie } from '../../types/movie'

export function countFavoriteMovie (state: IRootState): number {
  return state.favouriteMovies.movies.length || 0
}

export function getFavoriteMovie (state: IRootState): IMovie[] {
  return state.favouriteMovies.movies
}
