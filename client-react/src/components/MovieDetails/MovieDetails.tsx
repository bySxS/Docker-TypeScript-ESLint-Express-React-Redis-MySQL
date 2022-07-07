import React, { FC, useEffect, useState } from 'react'
import { IMovie, MovieDetailsItemProps, MovieDetailsParams } from '../../types/movie'
import classes from '../MovieItem/MovieItem.module.scss'
import { Card } from 'react-bootstrap'
import { isFavoriteMovie } from '../../services/moviesService'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { addMovieToFavourite, delMovieToFavourite } from '../../store/actions/favouriteMoviesActions'
import { useNavigate, useParams } from 'react-router-dom'
import { ModuleType } from '../../types/page'
import { receivedMovies } from '../../store/selectors/moviesSelector'
import { getFavoriteMovie } from '../../store/selectors/favouriteMoviesSelectors'

const MovieDetails: FC<MovieDetailsItemProps> = ({ modulePage }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  let movies: IMovie[] = useAppSelector(receivedMovies)
  const favouriteMovies: IMovie[] = useAppSelector(getFavoriteMovie)
  const [movie, setMovie] = useState<IMovie>()
  const [isLiked, setIsLiked] = useState(false)
  let checkLike: boolean = false
  if (modulePage === ModuleType.MOVIES) {
    checkLike = true
  } else if (modulePage === ModuleType.FAVOURITE_MOVIES) {
    movies = favouriteMovies
    checkLike = false
  }

  const params = useParams<MovieDetailsParams>()

  const getMovieById = () => {
    if (params.id && movies && movies.length > 0) {
      const movieId = +params.id
      const films = movies.filter((val) => val.id === movieId)
      if (films) {
        setMovie(films[0])
        setIsLiked(isFavoriteMovie(films[0].id, checkLike, favouriteMovies))
      }
    }
  }

  useEffect(() => {
    if (!movie && movies.length === 0 && modulePage === ModuleType.MOVIES) {
      const path = `/${modulePage}`
      navigate(path)
    } else {
      getMovieById()
    }
  }, [movies])

  useEffect(() => {
    if (movie) {
      setIsLiked(isFavoriteMovie(movie.id, checkLike, favouriteMovies))
    }
  }, [favouriteMovies])

  const likeMovie = () => {
    if (movie) {
      dispatch(addMovieToFavourite({ id: movie.id }))
    }
  }

  const dislikeMovie = () => {
    if (movie) {
      dispatch(delMovieToFavourite({ id: movie.id }))
      if (modulePage === ModuleType.FAVOURITE_MOVIES) {
        const path = `/${modulePage}`
        navigate(path)
      }
    }
  }

  if (!movie) {
    return (
      <div className={'body'}>
        <label style={{ color: 'white' }}>
          Нет фильмов в Store
        </label>
      </div>
    )
  }

  // TODO: изменить вид файла
  return (
      <div className={'body'}>
        <Card
          text={'secondary'}
          bg={'dark'}
          className={`${classes.Item} mb-2`}
        >
          <Card.Img src={movie.poster_path}/>
          <Card.Title className={classes.title}>
            {movie.title}
            <div className={classes.like_movie}>
              {isLiked
                ? <i className="bi bi-heart-fill"
                     onClick={dislikeMovie}></i>
                : <i className="bi bi-heart"
                     onClick={likeMovie}></i>
              }
            </div>
          </Card.Title>
        </Card>
      </div>
  )
}

export default MovieDetails
