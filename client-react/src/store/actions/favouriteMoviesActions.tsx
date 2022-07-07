import { createAsyncThunk } from '@reduxjs/toolkit'
import { IMovie, MovieActionType } from '../../types/movie'
import { IRootState } from '../index'
// import from service movie

export const addMovieToFavourite =
  createAsyncThunk<
    IMovie, {id: number},
    {state: IRootState}
    >(MovieActionType.ADD_TO_FAVOURITE_MOVIE,
      ({ id }, thunkAPI) => {
        try {
          const movies = thunkAPI.getState().movies.results
          const movie = movies.filter((val) => val.id === id)
          if (movie[0]) {
            return movie[0]
          } else {
            return thunkAPI.rejectWithValue(
              `Фильма по id ${id} не найдено`
            )
          }
        } catch (e) {
          return thunkAPI.rejectWithValue(
            'Произошла ошибка при добавлении фильма в избранное'
          )
        }
      })

export const delMovieToFavourite =
  createAsyncThunk<
    number, {id: number},
    {state: IRootState}
    >(MovieActionType.DEL_FROM_FAVOURITE_MOVIE,
      ({ id }, thunkAPI) => {
        if (id) {
          return id
        } else {
          return thunkAPI.rejectWithValue(
            `Фильма по id ${id} не найдено`
          )
        }
      })
