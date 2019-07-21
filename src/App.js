import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import { Context } from './core/withApi'
import Routes from './Routes'
import Menu from './layouts/Menu'

const API_CONFIG = {
  apiUrl: '',
  apiKey: '',
  storeKey: 'myMovies'
}

const api = {};
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
