import { IMovieState } from '../types/movie'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMovie } from 'types/movie'
import { updateGenre } from 'services/moviesService'

const initialState: IMovieState = {
  results: [],
  error: '',
  page: 0,
  currPage: 0,
  total_pages: 1,
  isLoading: false
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    moviesFetching (state) {
      state.isLoading = true
    },
    moviesFetchingSuccess (state, action: PayloadAction<IMovieState>) {
      let res: IMovie[] = [...state.results]
      const movies = action.payload.results
        .filter((movie, i, arr) => {
          arr[i] = updateGenre(arr[i])
          return true
        })
      if (movies) { // добавляем которых нет в списке
        const ids = new Set(state.results.map(o => o.id))
        res = [
          ...res,
          ...movies.filter(o => !ids.has(o.id))
        ]
      }
      state.page = action.payload.page
      state.currPage = action.payload.currPage + 1
      state.dates = action.payload.dates
      state.total_pages = action.payload.total_pages
      state.total_results = action.payload.total_results
      state.isLoading = false
      state.results = res
      state.error = ''
    },
    moviesFetchingError (state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const {
  moviesFetching,
  moviesFetchingSuccess,
  moviesFetchingError
} = movieSlice.actions

export default movieSlice.reducer
