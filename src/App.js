import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import Routes from './Routes'
import Menu from './layouts/Menu'
import { Context } from './core/withApi'
import Api from './api/api'

const API_CONFIG = {
  apiUrl: process.env.REACT_APP_API_URL,
  apiKey: process.env.REACT_APP_API_KEY,
  storeKey: 'myMovies',
  language: 'es-ES'
}

const api = new Api(API_CONFIG, localStorage, fetch.bind(window));
const App = () =>
    <Context.Provider value={api}>
      <BrowserRouter>
        <>
          <Menu />
          <Routes />
        </>
      </BrowserRouter>
    </Context.Provider>

export default App;
