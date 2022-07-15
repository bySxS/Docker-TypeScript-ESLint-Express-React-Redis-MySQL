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

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

if (SUBSCRIBE_STORE) {
  let currentValue: RootState
  const handleChange = () => {
    const previousValue = currentValue
    currentValue = setupStore().getState()

    if (previousValue !== currentValue) {
      console.log(
        'Some deep nested property changed from',
        previousValue,
        'to',
        currentValue
      )
    }
  }

  const unsubscribe =
  setupStore().subscribe(handleChange)
  unsubscribe()
}
