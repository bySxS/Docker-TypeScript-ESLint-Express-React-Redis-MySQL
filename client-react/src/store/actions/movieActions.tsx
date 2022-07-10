import { AppDispatch } from '../index'
import {
  moviesFetching,
  moviesFetchingError,
  moviesFetchingSuccess
} from '../reducers/moviesSlice'
import { MoviePageType } from 'types/movie'
import TheMovieDatabaseAPI from 'api/themoviedbApi'

export const fetchMovies =
(page: number, modulePage?: MoviePageType) =>
  async (dispatch: AppDispatch) => {
    dispatch(moviesFetching())
    const movies = await TheMovieDatabaseAPI.getMovies(page, modulePage)
    if (typeof movies === 'string') {
      dispatch(moviesFetchingError(movies))
    } else {
      dispatch(moviesFetchingSuccess(movies))
    }
  }
