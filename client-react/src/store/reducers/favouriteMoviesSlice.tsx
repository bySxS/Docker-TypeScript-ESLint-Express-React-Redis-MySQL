import {
  IFavouriteMoviesState
} from '../types/favouriteMovie'
import { IMovie } from '../../types/movie'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const favMoviesString = localStorage.getItem('favouriteMovies') || ''
let favMovies: IMovie[] = []
if (favMoviesString) {
  try {
    favMovies = JSON.parse(favMoviesString) as IMovie[]
  } catch (e) {
    favMovies = []
  }
}

const initialState: IFavouriteMoviesState = {
  movies: favMovies,
  error: ''
}

const favouriteMoviesSlice = createSlice({
  name: 'favouriteMovies',
  initialState,
  reducers: {
    addToFavouriteSuccess (state, action: PayloadAction<IMovie>) {
      let res: IMovie[] = [...state.movies]
      if (action.payload.id) { // добавляем если нет в списке
        const ids = new Set(state.movies.map(o => o.id))
        if (!ids.has(action.payload.id)) {
          res = [...res, action.payload]
          localStorage.setItem('favouriteMovies', JSON.stringify(res))
        }
      }
      state.movies = res
      state.error = ''
    },
    addToFavouriteError (state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    delFromFavouriteSuccess (state, action: PayloadAction<number>) {
      const id: number = action.payload
      const res = state.movies.filter((movie) => movie.id !== id)
      localStorage.setItem('favouriteMovies', JSON.stringify(res))
      state.movies = res
      state.error = ''
    },
    delFromFavouriteError (state, action: PayloadAction<string>) {
      state.error = action.payload
    }
  }
})

export const {
  addToFavouriteSuccess,
  addToFavouriteError,
  delFromFavouriteSuccess,
  delFromFavouriteError
} = favouriteMoviesSlice.actions

export default favouriteMoviesSlice.reducer
