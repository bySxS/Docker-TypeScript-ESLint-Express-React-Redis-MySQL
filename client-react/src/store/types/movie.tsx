import { IMovie } from 'types/movie'

export interface IMovieState {
  results: IMovie[]
  error: string
  page: number
  currPage: number
  dates?: {
    maximum: string
    minimum: string
  }
  total_pages: number
  total_results?: number
  isLoading: boolean
}

// export enum MovieActionType {
//   FETCH_MOVIES_ACTION = 'movies/fetchMoviesAction',
//   FETCH_MOVIES_ERROR = 'movies/fetchMoviesError'
// }
//
// interface IFetchMoviesAction {
//   type: MovieActionType.FETCH_MOVIES_ACTION
//   payload: IMovieState
// }
// //
// interface IFetchMoviesErrorAction {
//   type: MovieActionType.FETCH_MOVIES_ERROR
//   payload: string
// }
//
// export type MovieAction =
//   IFetchMoviesAction
//   | IFetchMoviesErrorAction
