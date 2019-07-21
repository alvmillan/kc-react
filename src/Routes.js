import React from 'react'
import {Switch, Route } from 'react-router'

import PopularMovies from './movies/PopularMovies'
import MovieDetail from './movies/MovieDetail'
import MovieCollections from './collections/MovieCollections'
import CollectionDetails from './collections/CollectionDetails'

const Routes = () => 
    <Switch>
        <Route exact path='/' component={PopularMovies}></Route>
        <Route exact path='/movie/:id' render={props => <MovieDetail movieId={props.match.params.id}/>} />
        <Route exact path='/collections' component={MovieCollections} />
        <Route exact path='/collections/:id' render={props => <CollectionDetails collectionId={props.match.params.id} />} />
    </Switch>


export default Routes

export const routes = {
    popularMovies: () => '/',
    movieDetail: id => `/movie/${id}`,
    movieCollections: () => '/collections',
    collectionDetails: id => `/collections/${id}`
}