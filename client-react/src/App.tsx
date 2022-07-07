import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import Movies from './pages/movies/movies'
import FavouriteMovies from './pages/favouriteMovies/favouriteMovies'
import Header from './components/header/header'
import MovieDetails from './components/MovieDetails/MovieDetails'
import { ModuleType } from './types/page'
import Loader from './components/UI/Loader/loader'

function App () {
  return (
    <Provider store={ store }>
    <BrowserRouter>
      <div className="App">
        <div className="main__bg"></div>
        <div className="main__bg layer1"></div>
        <div className="main__bg layer2"></div>
        <Header/>
        <Routes>
          <Route path={'/'}
                 element={<Navigate to={`/${ModuleType.MOVIES}`} />}/>
          <Route path={`/${ModuleType.MOVIES as string}`}
                 element={<Movies/>}/>
          <Route path={`/${ModuleType.MOVIES as string}/:id`}
                 element={<MovieDetails modulePage={ModuleType.MOVIES}/>}/>
          <Route path={`/${ModuleType.FAVOURITE_MOVIES as string}`}
                 element={<FavouriteMovies/>}/>
          <Route path={`/${ModuleType.FAVOURITE_MOVIES as string}/:id`}
                 element={<MovieDetails modulePage={ModuleType.FAVOURITE_MOVIES}/>}/>
          <Route path={'/loader'}
                 element={<Loader/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </Provider>
  )
}

export default App
