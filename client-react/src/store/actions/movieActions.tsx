import { createAsyncThunk } from '@reduxjs/toolkit'
import { IMovieState, MovieActionType } from '../../types/movie'
import { APIv3, IMG_URL, SITE_URL } from '../../constants'
import { loadingFalse, loadingTrue } from '../reducers/userSlice'
import { IRootState } from '../index'

export const fetchMovies =
  createAsyncThunk<IMovieState,
    {page: number, category?: string},
    {state: IRootState}
    >(MovieActionType.FETCH_MOVIES,
      async ({
        page = 1,
        category = 'movie/now_playing'
      }, thunkAPI) => {
        const loading = (thunkAPI.getState() as IRootState).user.loadingFetch
        const currPage = (thunkAPI.getState() as IRootState).movies.page
        if (page === 0) {
          page = 1
        }
        if ((loading) || (currPage >= page)) {
          console.log('страница ', currPage, ' уже была загружена', page, loading)
          // thunkAPI.dispatch(loadingFalse)
          return thunkAPI.rejectWithValue('Страница уже была загружена')
        }
        thunkAPI.dispatch(loadingTrue)
        let siteUrl: string = SITE_URL || ''
        const api: string = APIv3 || ''

        if ((!siteUrl) || (!api)) {
          console.log('Константы не подключены')
          thunkAPI.dispatch(loadingFalse)
          return thunkAPI.rejectWithValue('Константы не подключены')
        }
        try {
          siteUrl = siteUrl + category + '?api_key=' +
            api + '&language=ru-RU&page=' + page

          const res = await fetch(siteUrl, {
            method: 'get',
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          })
          const result: IMovieState = await res.json()
          result.currPage = page
          if (result && result.results) {
            result.results = result.results.map((movie) => ({
              ...movie,
              poster_path: IMG_URL + movie.poster_path,
              backdrop_path: IMG_URL + movie.backdrop_path
            }))
          }
          thunkAPI.dispatch(loadingFalse)
          return result
        } catch (e) {
          thunkAPI.dispatch(loadingFalse)
          return thunkAPI.rejectWithValue('Ошибка получения данных')
        }
      }
    )
