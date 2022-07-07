import { IMovie } from '../../types/movie'
import { IRootState } from '../index'

export const receivedMovies = (state: IRootState): IMovie[] => {
  return state.movies.results
}

export const pageMovies = (state: IRootState): number => {
  return state.movies.page
}

export const currPageMovies = (state: IRootState): number => {
  return state.movies.currPage
}

export const totalPagesMovies = (state: IRootState): number => {
  return state.movies.total_pages
}

export const countMovies = (state: IRootState): number => {
  return state.movies.results.length || 0
}
