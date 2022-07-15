import React, { FC, useEffect, useState } from 'react'
import { MovieDetailsItemProps, MovieDetailsParams } from 'types/movie'
import classItem from '../MovieItem/MovieItem.module.scss'
import classDetails from './MovieDetails.module.scss'
import { Card, Stack } from 'react-bootstrap'
import { isFavoriteMovie } from 'services/moviesService'
import { useAppDispatch, useAppSelector } from 'hooks/useStore'
import {
  addMovieToFavourite,
  delMovieFromFavourite
} from 'store/actions/favouriteMoviesActions'
import { useNavigate, useParams } from 'react-router-dom'
import { ModuleName } from 'constants/page'
import { getByIdMovie } from 'store/selectors/moviesSelector'
import { getByIdFavouriteMovie, getFavoriteMovie } from 'store/selectors/favouriteMoviesSelectors'

const MovieDetails: FC<MovieDetailsItemProps> = ({ modulePage }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id } = useParams<MovieDetailsParams>()
  if (!id) {
    return (
        <div className={'body'}>
          <label style={{ color: 'white' }}>
            ID не указан
          </label>
        </div>
    )
  }
  let movie = useAppSelector(getByIdMovie(+id))
  const favouriteMovies = useAppSelector(getFavoriteMovie)
  const [isLiked, setIsLiked] = useState(false)
  let checkLike: boolean = false
  if (modulePage === ModuleName.MOVIES) {
    checkLike = true
  } else if (modulePage === ModuleName.FAVOURITE_MOVIES) {
    movie = useAppSelector(getByIdFavouriteMovie(+id))
    checkLike = false
  }

  useEffect(() => {
    if (!movie && modulePage === ModuleName.MOVIES) {
      const path = `/${modulePage}`
      navigate(path)
    } else {
      setIsLiked(isFavoriteMovie(movie.id, checkLike, favouriteMovies))
    }
  }, [favouriteMovies])

  const likeMovie = () => {
    if (movie) {
      dispatch(addMovieToFavourite(movie))
    }
  }

  const dislikeMovie = () => {
    if (movie) {
      dispatch(delMovieFromFavourite(movie.id))
      if (modulePage === ModuleName.FAVOURITE_MOVIES) {
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

  return (
      <div className={classDetails.details_body}>
        <Card
          text={'secondary'}
          bg={'dark'}
          className={`${classDetails.details_movie} mb-2`}
        >
        <Stack className={classDetails.autosize} direction="horizontal" gap={3}>
          <div className={classDetails.img_position}>
            <Card.Img className={classDetails.movie_cover}
                      src={movie.poster_path}/>
          </div>
            <Card.Body className={`ms-auto ${classDetails.movie_info}`}>
              <Card.Title className={classItem.title}>
              {movie.title}
              </Card.Title>
              <div>
              <Card.Text>
                <b>Описание</b>: {movie.overview || '--'}
              </Card.Text>
              <Card.Text
                className={classDetails.info_field}
              >
                <b>Дата выхода</b>: {movie.release_date || '--'}
              </Card.Text>
                <Card.Text
                  className={classDetails.info_field}
                >
                  <b>Жанры</b>: {movie.genre_name?.join(', ') || '--'}
                </Card.Text>
              <Card.Text
                className={classDetails.info_field}
              >
                <b>Оценка</b>: {movie.vote_average} / <b>кол. голосов</b>: {movie.vote_count}
              </Card.Text>
              <Card.Text
                className={classDetails.info_field}
              >
                <b>Для взрослых</b>: {movie.adult ? 'Да' : 'Нет'}
               </Card.Text>
              </div>
          </Card.Body>
          <div>
            <div className={classItem.like_movie}>
            {isLiked
              ? <i className="bi bi-heart-fill"
                   onClick={dislikeMovie}></i>
              : <i className="bi bi-heart"
                   onClick={likeMovie}></i>
            }
          </div>
          </div>
        </Stack>
        </Card>
      </div>
  )
}

MovieDetails.displayName = 'MovieDetails'

export default MovieDetails
