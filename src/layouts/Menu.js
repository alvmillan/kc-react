import React from 'react'

import Nav from './Nav'
import SearchInput from './SearchInput'

import './Menu.css'

const Menu = () =>
    <header className='header'>
        <Nav />
        <SearchInput />
    </header>

export default Menu