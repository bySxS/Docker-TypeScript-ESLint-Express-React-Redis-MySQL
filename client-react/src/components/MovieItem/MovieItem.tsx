import React, { FC } from 'react'
import { MovieItemProps } from 'types/movie'
import { Card } from 'react-bootstrap'
import classes from './MovieItem.module.scss'
import { getFavoriteMovie } from 'store/selectors/favouriteMoviesSelectors'
import { useAppSelector, useAppDispatch } from 'hooks/useStore'
import { isFavoriteMovie } from 'services/moviesService'
import { addMovieToFavourite, delMovieFromFavourite } from 'store/actions/favouriteMoviesActions'
import { useNavigate } from 'react-router-dom'

const MovieItem: FC<MovieItemProps> = ({ movie, checkLike, modulePage }) => {
  const navigate = useNavigate()

  const favouriteMovie = useAppSelector(getFavoriteMovie)
  const dispatch = useAppDispatch()

  const likeMovie = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(addMovieToFavourite(movie))
  }

  const dislikeMovie = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(delMovieFromFavourite(movie.id))
  }

  const goToMovieDetails = () => {
    const path = `/${modulePage}/${movie.id}`
    navigate(path)
  }

  return (
      <Card
        text={'secondary'}
        bg={'dark'}
        className={ `${classes.Item} mb-2` }
        onClick={goToMovieDetails}
      >
        <Card.Img src={movie.poster_path}/>
        <Card.Title className={ classes.title }>
          {movie.title}
          <div className={ classes.like_movie }>
            {isFavoriteMovie(movie.id, checkLike, favouriteMovie)
              ? <i className="bi bi-heart-fill"
              onClick={dislikeMovie}></i>
              : <i className="bi bi-heart"
              onClick={likeMovie}></i>
            }
          </div>
        </Card.Title>
      </Card>
  )
}

MovieItem.displayName = 'MovieItem'

export default MovieItem
