// import { createSlice } from '@reduxjs/toolkit'
import { IFavouriteMovies, IMovie, MovieAction, MovieActionType } from '../../types/movie'

const initialState: IFavouriteMovies = {
  // count: 0,
  movies: [],
  error: ''
}

export const favouriteMoviesReducer =
  (state = initialState, action: MovieAction): IFavouriteMovies => {
    switch (action.type) {
      case MovieActionType.ADD_TO_FAVOURITE_MOVIE_fulfilled: {
        let res: IMovie[] = [...state.movies]
        if (action.payload.id) { // добавляем которых нет в списке
          const ids = new Set(state.movies.map(o => o.id))
          if (!ids.has(action.payload.id)) {
            res = [...res, action.payload]
          }
        }
        return {
          // count: res.length,
          movies: res,
          error: ''
        }
      }

      case MovieActionType.ADD_TO_FAVOURITE_MOVIE_rejected: {
        return { ...state, error: action.payload }
      }

      case MovieActionType.DEL_FROM_FAVOURITE_MOVIE_fulfilled: {
        const id: number = action.payload
        const res = state.movies.filter((movie) => movie.id !== id)
        return {
          movies: res,
          // count: res.length,
          error: ''
        }
      }

      case MovieActionType.DEL_FROM_FAVOURITE_MOVIE_rejected: {
        return { ...state, error: action.payload }
      }

      default:
        return state
    }
  }
