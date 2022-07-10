import { IMovie } from 'types/movie'

export interface IFavouriteMoviesState {
  movies: IMovie[]
  error: string
}

// export enum FavouriteMovieActionType {
//   GET_FAVOURITE_MOVIE_BY_ID = 'favouriteMovies/getById',
//   GET_FAVOURITE_MOVIE_BY_ID_fulfilled = 'favouriteMovies/getById/fulfilled',
//   GET_FAVOURITE_MOVIE_BY_ID_rejected = 'favouriteMovies/getById/rejected',
//
//   ADD_TO_FAVOURITE_MOVIE = 'favouriteMovies/AddToFavourite',
//   ADD_TO_FAVOURITE_MOVIE_fulfilled = 'favouriteMovies/AddToFavourite/fulfilled',
//   ADD_TO_FAVOURITE_MOVIE_rejected = 'favouriteMovies/AddToFavourite/rejected',
//
//   DEL_FROM_FAVOURITE_MOVIE = 'favouriteMovies/DelFromFavourite',
//   DEL_FROM_FAVOURITE_MOVIE_fulfilled = 'favouriteMovies/DelFromFavourite/fulfilled',
//   DEL_FROM_FAVOURITE_MOVIE_rejected = 'favouriteMovies/DelFromFavourite/rejected'
// }
//
// interface IGetFavouriteMovieByIdAction {
//   type: FavouriteMovieActionType.GET_FAVOURITE_MOVIE_BY_ID_fulfilled
//   payload: IMovie
// }
// //
// interface IGetFavouriteMovieByIdErrorAction {
//   type: FavouriteMovieActionType.GET_FAVOURITE_MOVIE_BY_ID_rejected
//   payload: string
// }
//
// interface IAddToFavouriteMovieAction {
//   type: FavouriteMovieActionType.ADD_TO_FAVOURITE_MOVIE_fulfilled
//   payload: IMovie
// }
//
// interface IAddToFavouriteMovieErrorAction {
//   type: FavouriteMovieActionType.ADD_TO_FAVOURITE_MOVIE_rejected
//   payload: string
// }
//
// interface IDelFromFavouriteMovieAction {
//   type: FavouriteMovieActionType.DEL_FROM_FAVOURITE_MOVIE_fulfilled
//   payload: number
// }
//
// interface IDelFromFavouriteMovieErrorAction {
//   type: FavouriteMovieActionType.DEL_FROM_FAVOURITE_MOVIE_rejected
//   payload: string
// }
//
// export type FavouriteMovieAction =
//   IGetFavouriteMovieByIdAction
//   | IGetFavouriteMovieByIdErrorAction
//   | IAddToFavouriteMovieAction
//   | IAddToFavouriteMovieErrorAction
//   | IDelFromFavouriteMovieAction
//   | IDelFromFavouriteMovieErrorAction
