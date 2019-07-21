import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'
import { routes } from '../Routes'

const Nav = (props) =>
    <nav className='menu'>
        <ul>
            <li className='menu__option'>
                <NavLink
                    exact
                    className='menu__entry'
                    activeClassName='menu__entry--active'
                    to={routes.popularMovies()}
                >
                    Popular movies
                </NavLink>
            </li>
        </ul>
    </nav>

export default Nav