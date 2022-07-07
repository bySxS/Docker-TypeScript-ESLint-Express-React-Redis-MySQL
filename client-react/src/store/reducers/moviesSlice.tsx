// import { createSlice } from '@reduxjs/toolkit'
import {
  IMovie,
  IMovieState,
  MovieAction,
  MovieActionType
} from '../../types/movie'

const initialState: IMovieState = {
  results: [],
  // count: 0,
  error: '',
  page: 0,
  currPage: 0,
  total_pages: 1
}

export const moviesReducer =
  (state = initialState, action: MovieAction): IMovieState => {
    let res: IMovie[] = [...state.results]
    switch (action.type) {
      case MovieActionType.FETCH_MOVIES_fulfilled: {
        if (action.payload.results) { // добавляем которых нет в списке
          const ids = new Set(state.results.map(o => o.id))
          res = [
            ...res,
            ...action.payload.results.filter(o => !ids.has(o.id))
          ]
        }
        return {
          page: action.payload.page,
          currPage: action.payload.currPage + 1,
          dates: action.payload.dates,
          total_pages: action.payload.total_pages,
          total_results: action.payload.total_results,
          results: res,
          // count: res.length,
          error: ''
        }
      }

      case MovieActionType.FETCH_MOVIES_rejected: {
        return { ...state, error: action.payload }
      }
      default:
        return state
    }
  }

// const moviesSlice = createSlice({
//   name: 'movies',
//   initialState,
//   reducers: {},
//   extraReducers: {  (builder) => {
// builder
//   .addCase(fetchMovies.fulfilled,
//     (state: IMovieState, action) => {
//       if (action.payload.results) {
//         const ids = new Set(state.results.map(o => o.id))
//         state.results = [
//           ...state.results,
//           ...action.payload.results.filter(o => !ids.has(o.id))
//         ]
//       }
//       state.page = action.payload.page
//       state.currPage = action.payload.currPage + 1
//       state.dates = action.payload.dates
//       state.total_pages = action.payload.total_pages
//       state.total_results = action.payload.total_results
//     })
//   .addCase(fetchMovies.rejected,
//     (state: IMovieState, action: string | RejectedValue<any>) => {
//       state.error = action.payload
//       state.error = state.error + ' ' + action.error.message || ''
//     })
//   }
// })

// export default moviesSlice.reducer
