import { ModuleType } from './page'

export interface IMovie {
  id: number
  poster_path?: string
  backdrop_path?: string
  adult?: boolean
  release_date?: string
  original_title?: string
  original_language?: string
  title: string
  genre_ids?: number[]
  overview?: string
  vote_count?: number
  vote_average?: number
  popularity?: number
  video?: boolean
}

export interface IMovieState {
  results: IMovie[]
  // count: number
  error: string
  page: number
  currPage: number
  dates?: {
    maximum: string
    minimum: string
  }
  total_pages: number
  total_results?: number
}

export interface MovieItemProps {
  movie: IMovie
  checkLike: boolean
  modulePage: ModuleType
}

export interface MovieDetailsItemProps {
  modulePage: ModuleType
}

export interface MovieDetailsParams {
  [id: string]: string
}

export interface IFavouriteMovies {
  movies: IMovie[]
  // count: number
  error: string
}

export enum MovieActionType {
  FETCH_MOVIES = 'movies/fetchMovies',
  FETCH_MOVIES_fulfilled = 'movies/fetchMovies/fulfilled',
  FETCH_MOVIES_rejected = 'movies/fetchMovies/rejected',

  ADD_TO_FAVOURITE_MOVIE = 'movies/AddToFavourite',
  ADD_TO_FAVOURITE_MOVIE_fulfilled = 'movies/AddToFavourite/fulfilled',
  ADD_TO_FAVOURITE_MOVIE_rejected = 'movies/AddToFavourite/rejected',

  DEL_FROM_FAVOURITE_MOVIE = 'movies/DelFromFavourite',
  DEL_FROM_FAVOURITE_MOVIE_fulfilled = 'movies/DelFromFavourite/fulfilled',
  DEL_FROM_FAVOURITE_MOVIE_rejected = 'movies/DelFromFavourite/rejected'
}

interface IFetchMoviesAction {
  type: MovieActionType.FETCH_MOVIES_fulfilled
  payload: IMovieState
}
//
interface IFetchMoviesErrorAction {
  type: MovieActionType.FETCH_MOVIES_rejected
  payload: string
}

interface IAddToFavouriteMovieAction {
  type: MovieActionType.ADD_TO_FAVOURITE_MOVIE_fulfilled
  payload: IMovie
}

interface IAddToFavouriteMovieErrorAction {
  type: MovieActionType.ADD_TO_FAVOURITE_MOVIE_rejected
  payload: string
}

interface IDelFromFavouriteMovieAction {
  type: MovieActionType.DEL_FROM_FAVOURITE_MOVIE_fulfilled
  payload: number
}

interface IDelFromFavouriteMovieErrorAction {
  type: MovieActionType.DEL_FROM_FAVOURITE_MOVIE_rejected
  payload: string
}

export type MovieAction =
  IFetchMoviesAction
  | IFetchMoviesErrorAction
  | IAddToFavouriteMovieAction
  | IAddToFavouriteMovieErrorAction
  | IDelFromFavouriteMovieAction
  | IDelFromFavouriteMovieErrorAction
