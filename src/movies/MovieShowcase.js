import React from 'react'
import {Link} from 'react-router-dom'

import { routes } from '../Routes'
import Showcase from './Showcase'

import './MovieShowcase.css'

export default ( {movies, children}) =>
    <div className='movie_showcase'>
        <div className='movie_showcase__heading'>
            {children}
        </div>
        <Showcase items={movies} keys={movie => movie.id} render={movie => 
            <Link to={routes.movieDetail(movie.id)}>
                <img
                    className='movie_showcase__movie'
                    src={movie.poster_path}
                    alt={movie.title}
                />
            </Link>
        } />
    </div>