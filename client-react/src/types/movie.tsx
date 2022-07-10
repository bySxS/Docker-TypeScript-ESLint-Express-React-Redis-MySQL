import { ModuleName } from '../constants/page'

export interface IMovie {
  id: number
  poster_path?: string
  backdrop_path?: string
  adult?: boolean
  release_date?: string
  original_title?: string
  original_language?: string
  title: string
  genre_ids?: number[]
  genre_name?: string[]
  overview?: string
  vote_count?: number
  vote_average?: number
  popularity?: number
  video?: boolean
}

export enum MoviePageType {
  FETCH_MOVIES_PLAYING_NOW = 'movie/now_playing',
  FETCH_MOVIES_POPULAR = 'movie/popular',
  FETCH_MOVIES_TOP_RATED = 'movie/top_rated',
  FETCH_MOVIES_UPCOMING = 'movie/upcoming',
}

export interface MovieItemProps {
  movie: IMovie
  checkLike: boolean
  modulePage: ModuleName
}

export interface MovieDetailsItemProps {
  modulePage: ModuleName
}

export interface MovieDetailsParams {
  [id: string]: string
}
