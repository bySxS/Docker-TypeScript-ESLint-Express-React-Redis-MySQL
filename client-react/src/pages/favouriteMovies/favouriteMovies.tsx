import React from 'react'
import { useAppSelector } from '../../hooks/useStore'
import { getFavoriteMovie } from '../../store/selectors/favouriteMoviesSelectors'
import classes from '../movies/movie.module.scss'
import MovieItem from '../../components/MovieItem/MovieItem'
import { ModuleType } from '../../types/page'

const FavouriteMovies = () => {
  const favoriteMovie = useAppSelector(getFavoriteMovie)

  if (favoriteMovie.length === 0) {
    return (
      <div className={'body'}>
        <label style={{ color: 'white' }}>
          Нет любимых фильмов
        </label>
      </div>
    )
  }

  return (
    <div className={'body'}>
    <div className={ classes.itemMovie }>
      {favoriteMovie.map((movie) =>
        <MovieItem movie={movie} modulePage={ModuleType.FAVOURITE_MOVIES} checkLike={false} key={movie.id} />
      )}
    </div>
    </div>
  )
}

export default FavouriteMovies