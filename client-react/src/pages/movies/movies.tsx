import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { fetchMovies } from '../../store/actions/movieActions'
import MovieItem from '../../components/MovieItem/MovieItem'
import classes from './movie.module.scss'
import { currPageMovies, receivedMovies, totalPagesMovies } from '../../store/selectors/moviesSelector'
import { loadingFetch } from '../../store/selectors/userSelector'
import { useObserver } from '../../hooks/useObserver'
import Loader from '../../components/UI/Loader/loader'
import { ModuleType } from '../../types/page'
import { IMovie } from '../../types/movie'

const Movies = () => {
  const movies: IMovie[] = useAppSelector(receivedMovies)
  // const count = useAppSelector(countMovies)
  const loading = useAppSelector(loadingFetch)
  // const page = useAppSelector(pageMovies)
  const currPage = useAppSelector(currPageMovies)
  const totalPages = useAppSelector(totalPagesMovies)
  const pagination = useRef<HTMLHeadingElement>(null)
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getMovies = async () => {
    setIsLoading(true)
    await dispatch(await fetchMovies({ page: currPage }))
    setIsLoading(false)
  }

  useObserver(pagination, currPage, totalPages, loading, getMovies)

  return (
    <div className={'body'}>
    <div className={ classes.itemMovie }>
      {movies.map((movie) =>
        <MovieItem movie={movie} modulePage={ModuleType.MOVIES} checkLike={true} key={movie.id} />
      )}
       <div ref={ pagination } className={ classes.autoPagination }/>
    </div>
      {isLoading &&
        <div>
          <Loader/>
        </div>
      }
    </div>
  )
}

export default Movies
