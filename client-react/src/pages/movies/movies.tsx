import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/useStore'
import { fetchMovies } from 'store/actions/movieActions'
import MovieItem from 'components/MovieItem/MovieItem'
import classes from './movie.module.scss'
import {
  currPageMovies, isLoadingMovies,
  receivedMovies,
  totalPagesMovies
} from 'store/selectors/moviesSelector'
import { loadingFetch } from 'store/selectors/userSelector'
import { useObserver } from 'hooks/useObserver'
import Loader from 'components/UI/Loader/loader'
import { ModuleName } from 'constants/page'
import { IMovie } from 'types/movie'

const Movies = () => {
  const movies: IMovie[] = useAppSelector(receivedMovies)
  const loading = useAppSelector(loadingFetch)
  const currPage = useAppSelector(currPageMovies)
  const totalPages = useAppSelector(totalPagesMovies)
  const isLoading = useAppSelector(isLoadingMovies)
  const pagination = useRef<HTMLHeadingElement>(null)
  const dispatch = useAppDispatch()

  const getMovies = async () => {
    await dispatch(await fetchMovies(currPage))
  }

  useObserver(pagination, currPage, totalPages, loading, getMovies)

  return (
    <div className={'body'}>
    <div className={ classes.itemMovie }>
      {movies.map((movie) =>
        <MovieItem movie={movie}
                   modulePage={ModuleName.MOVIES}
                   checkLike={true}
                   key={movie.id}
        />
      )}
       <div ref={ pagination }
            className={ classes.autoPagination }/>
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
