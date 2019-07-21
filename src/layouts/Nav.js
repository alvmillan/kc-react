import React from 'react'
import { NavLink } from 'react-router-dom'

import { routes } from '../Routes'

const Nav = (props) =>
    <nav>
        <ul>
            <li>
                <NavLink
                    exact
                    to={routes.popularMovies()}
                >
                    Popular movies
                </NavLink>
            </li>
        </ul>
    </nav>

export default Nav