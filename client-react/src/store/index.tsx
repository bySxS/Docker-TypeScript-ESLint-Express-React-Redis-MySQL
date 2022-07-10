import { configureStore, combineReducers } from '@reduxjs/toolkit'
import favouriteMoviesSlice from './reducers/favouriteMoviesSlice'
import userSlice from './reducers/userSlice'
import movieSlice from './reducers/moviesSlice'
import { SUBSCRIBE_STORE } from '../constants/constant'

const reducers = {
  favouriteMovies: favouriteMoviesSlice,
  movies: movieSlice,
  user: userSlice
}

const rootReducer = combineReducers({
  ...reducers
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true
  })
}

// Can still subscribe to the store
if (SUBSCRIBE_STORE) {
  setupStore().subscribe(() =>
    console.log(setupStore().getState()))
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
