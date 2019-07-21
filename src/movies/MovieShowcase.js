import React from 'react'
import {Link} from 'react-router-dom'

import { routes } from '../Routes'
import Showcase from './Showcase'

export default ( {movies, children}) =>
    <div>
        <div>
            {children}
        </div>
        <Showcase items={movies} keys={movie => movie.id} render={movie => {
            <Link to={routes.movieDetail(movie.id)}>
                <img
                    src={movie.poster_path}
                    alt={movie.title}
                />
            </Link>
        }} />
    </div>