import { IFavouriteMovies, IMovie, MovieAction, MovieActionType } from '../../types/movie'

const favMoviesString = localStorage.getItem('favouriteMovies') || ''
let favMovies: IMovie[] = []
if (favMoviesString) {
  try {
    favMovies = JSON.parse(favMoviesString) as IMovie[]
  } catch (e) {
    favMovies = []
  }
}

const initialState: IFavouriteMovies = {
  movies: favMovies,
  error: ''
}

export const favouriteMoviesReducer =
  (state = initialState, action: MovieAction): IFavouriteMovies => {
    switch (action.type) {
      case MovieActionType.ADD_TO_FAVOURITE_MOVIE_fulfilled: {
        let res: IMovie[] = [...state.movies]
        if (action.payload.id) { // добавляем которых нет в списке
          const ids = new Set(state.movies.map(o => o.id))
          if (!ids.has(action.payload.id)) {
            res = [...res, action.payload]
            localStorage.setItem('favouriteMovies', JSON.stringify(res))
          }
        }
        return {
          movies: res,
          error: ''
        }
      }

      case MovieActionType.ADD_TO_FAVOURITE_MOVIE_rejected: {
        return { ...state, error: action.payload }
      }

      case MovieActionType.DEL_FROM_FAVOURITE_MOVIE_fulfilled: {
        const id: number = action.payload
        const res = state.movies.filter((movie) => movie.id !== id)
        localStorage.setItem('favouriteMovies', JSON.stringify(res))
        return {
          movies: res,
          error: ''
        }
      }

      case MovieActionType.DEL_FROM_FAVOURITE_MOVIE_rejected: {
        return { ...state, error: action.payload }
      }

      default:
        return state
    }
  }
