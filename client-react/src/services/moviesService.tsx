import { IMovie } from '../types/movie'

export function isFavoriteMovie (id: number,
  checkLike: boolean,
  favouriteMovie?: IMovie[]
): boolean {
  if (!checkLike) {
    return true
  }
  if (!favouriteMovie) {
    return false
  }
  const ids = new Set(favouriteMovie.map(o => o.id))
  return ids.has(id)
}

export function updateGenre (movie: IMovie): IMovie {
  const genresMovies = [
    {
      id: 28,
      name: 'боевик'
    },
    {
      id: 12,
      name: 'приключения'
    },
    {
      id: 16,
      name: 'мультфильм'
    },
    {
      id: 35,
      name: 'комедия'
    },
    {
      id: 80,
      name: 'криминал'
    },
    {
      id: 99,
      name: 'документальный'
    },
    {
      id: 18,
      name: 'драма'
    },
    {
      id: 10751,
      name: 'семейный'
    },
    {
      id: 14,
      name: 'фэнтези'
    },
    {
      id: 36,
      name: 'история'
    },
    {
      id: 27,
      name: 'ужасы'
    },
    {
      id: 10402,
      name: 'музыка'
    },
    {
      id: 9648,
      name: 'детектив'
    },
    {
      id: 10749,
      name: 'мелодрама'
    },
    {
      id: 878,
      name: 'фантастика'
    },
    {
      id: 10770,
      name: 'телевизионный фильм'
    },
    {
      id: 53,
      name: 'триллер'
    },
    {
      id: 10752,
      name: 'военный'
    },
    {
      id: 37,
      name: 'вестерн'
    }
  ]

  const genreName: string[] = movie.genre_ids?.map((genre) =>
    genresMovies
      .filter((field) => field.id === genre))
    .map(([{ name }]) => name) || []
  const fixMovie = movie
  fixMovie.genre_name = genreName
  return fixMovie
}
