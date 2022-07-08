// import { createSlice } from '@reduxjs/toolkit'
import {
  IMovie,
  IMovieState,
  MovieAction,
  MovieActionType
} from '../../types/movie'

const initialState: IMovieState = {
  results: [],
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
