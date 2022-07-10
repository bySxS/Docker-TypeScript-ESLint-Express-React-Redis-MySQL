import axios, { AxiosInstance } from 'axios'
// import Cookies from 'universal-cookie'
import { IMovieState } from '../store/types/movie'
import { IMG_WIDTH } from '../constants/constant'
import { MoviePageType } from '../types/movie'

// const cookies = new Cookies()

// interface IGetToken {
//   success: boolean
//   expires_at: string
//   request_token: string
//   status_code?: number
//   status_message?: string
// }

// interface IPostBodyLogin {
//   username: string
//   password: string
//   request_token: string
// }

class TheMovieDatabaseAPI {
  private static instance = new TheMovieDatabaseAPI()
  private request: AxiosInstance
  private readonly SITE_URL: string = 'https://api.themoviedb.org/3/'
  private readonly IMG_URL = 'https://image.tmdb.org/t/p/w' + IMG_WIDTH
  private readonly APIv3: string = '6e9897b249789e60aa98c65c9932f426'
  private readonly LANGUAGE: string = '&language=ru-RU'
  // private token: string

  static getInstance (): TheMovieDatabaseAPI {
    if (!TheMovieDatabaseAPI.instance) {
      TheMovieDatabaseAPI.instance = new TheMovieDatabaseAPI()
    }
    return TheMovieDatabaseAPI.instance
  }

  constructor () {
    // const authDataString = cookies.get('site_auth')
    // const authDataString = localStorage.getItem('site_auth')
    // let accessToken: string = ''
    // if (authDataString) {
    //   accessToken = JSON.parse(authDataString)
    // }
    // this.token = accessToken
    this.request = axios.create({
      baseURL: this.SITE_URL,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
        // Authorization: `${accessToken}`
      }
    })
  }

  // private async createToken () {
  //   const response = await this.request.get<IGetToken>(`/authentication/token/new?api_key=${this.APIv3}`)
  //   this.token = response.data.request_token
  //   console.log('this.token', this.token)
  // }

  // async checkAuth (username: string, password: string): Promise<string> {
  //   let response
  //   try {
  //     await this.createToken()
  //     response = await this.request.post<IGetToken>(`authentication/token/validate_with_login?api_key=${this.APIv3}`, {
  //       username,
  //       password,
  //       request_token: this.token
  //     } as IPostBodyLogin)
  //     if (!response || !response.data) {
  //       return 'Ошибка авторизации'
  //     }
  //     cookies.set('site_auth',
  //       JSON.stringify(response.data.request_token),
  //       {
  //         path: '/',
  //         expires: new Date(response.data.expires_at)
  //       })
  //     // localStorage.setItem('site_auth', JSON.stringify(response.data))
  //     this.request.defaults.headers.get = {
  //       Authorization: `${response.data.request_token}`
  //     }
  //     this.request.defaults.headers.post = {
  //       Authorization: `${response.data.request_token}`
  //     }
  //     this.request.defaults.headers.delete = {
  //       Authorization: `${response.data.request_token}`
  //     }
  //     return 'Авторизация прошла успешно!'
  //   } catch (e) {
  //     let err = ''
  //     if (response) {
  //       err = response.data.status_message || ''
  //     }
  //     return err
  //   }
  // }

  async getMovies (page: number = 1, movieModule: MoviePageType = MoviePageType.FETCH_MOVIES_PLAYING_NOW): Promise<IMovieState | string> {
    try {
      if (page === 0) {
        page = 1
      }
      const response =
        await this.request.get<IMovieState
          >(`${movieModule}?api_key=${this.APIv3}${this.LANGUAGE}&page=${page}`)
      response.data.currPage = page
      return this.addLinkToImg(response.data)
    } catch (e) {
      return 'Ошибка при получении фильмов'
    }
  }

  private addLinkToImg (ListMovies: IMovieState): IMovieState {
    return {
      ...ListMovies,
      results: ListMovies.results.map((movie) => ({
        ...movie,
        poster_path: this.IMG_URL + movie.poster_path,
        backdrop_path: this.IMG_URL + movie.backdrop_path
      }))
    }
  }
}

export default TheMovieDatabaseAPI.getInstance()
