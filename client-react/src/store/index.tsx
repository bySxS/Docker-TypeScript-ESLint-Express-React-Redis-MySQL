import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { favouriteMoviesReducer } from './reducers/favouriteMoviesSlice'
import { moviesReducer } from './reducers/moviesSlice'
import userSlice from './reducers/userSlice'
import { SUBSCRIBE_STORE } from '../constants'

const reducers = {
  favouriteMovies: favouriteMoviesReducer,
  movies: moviesReducer,
  user: userSlice
}

const rootReducer = combineReducers({
  ...reducers
})

export const store = configureStore({
  reducer: rootReducer
})

// Can still subscribe to the store
if (SUBSCRIBE_STORE) {
  store.subscribe(() => console.log(store.getState()))
}

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
