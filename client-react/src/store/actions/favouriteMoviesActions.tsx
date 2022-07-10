import { AppDispatch } from '../index'
import {
  addToFavouriteError,
  addToFavouriteSuccess,
  delFromFavouriteError,
  delFromFavouriteSuccess
} from '../reducers/favouriteMoviesSlice'
import { IMovie } from '../../types/movie'

export const addMovieToFavourite =
  (movie: IMovie) =>
    (dispatch: AppDispatch) => {
      if (movie) {
        dispatch(addToFavouriteSuccess(movie))
      } else {
        dispatch(addToFavouriteError('Ошибка добавления в избранное'))
      }
    }

export const delMovieFromFavourite =
  (id: number) =>
    (dispatch: AppDispatch) => {
      if (id > 0) {
        dispatch(delFromFavouriteSuccess(id))
      } else {
        dispatch(delFromFavouriteError('Ошибка удаления в избранное'))
      }
    }
