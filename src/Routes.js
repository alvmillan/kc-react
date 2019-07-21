import React from 'react'
import {Switch, Route } from 'react-router'

import PopularMovies from './movies/PopularMovies'
import MovieDetail from './movies/MovieDetail'

const Routes = () => 
    <Switch>
        <Route exact path='/' component={PopularMovies}></Route>
        <Route exact path='movie/:id' render={props => <MovieDetail movieId={props.match.params.movieId}></MovieDetail>} />
    </Switch>


export default Routes

export const routes = {
    popularMovies: () => '/',
    movieDetail: id => `movie/${id}`
}