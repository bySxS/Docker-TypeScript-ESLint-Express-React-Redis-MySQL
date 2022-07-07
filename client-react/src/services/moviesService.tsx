import { IMovie } from '../types/movie'

export function isFavoriteMovie (id: number, checkLike: boolean, favouriteMovie?: IMovie[]): boolean {
  if (!checkLike) {
    return true
  }
  if (!favouriteMovie) {
    return false
  }
  const ids = new Set(favouriteMovie.map(o => o.id))
  if (ids.has(id)) {
    return true
  } else {
    return false
  }
}
