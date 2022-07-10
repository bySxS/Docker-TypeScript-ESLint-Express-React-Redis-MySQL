import { IMovie } from 'types/movie'
import { RootState } from '../index'

export const receivedMovies = (state: RootState): IMovie[] => {
  return state.movies.results
}

export const getByIdMovie = (id: number) => (state: RootState): IMovie => {
  return state.movies.results.filter((movie) => movie.id === id)[0]
}

export const pageMovies = (state: RootState): number => {
  return state.movies.page
}

export const currPageMovies = (state: RootState): number => {
  return state.movies.currPage
}

export const totalPagesMovies = (state: RootState): number => {
  return state.movies.total_pages
}

export const countMovies = (state: RootState): number => {
  return state.movies.results.length || 0
}

export const isLoadingMovies = (state: RootState): boolean => {
  return state.movies.isLoading
}
