import React from 'react'

import './Showcase.css'

const Showcase = props =>
    <ul className='showcase'>
        {
            props.children &&
            <li className='showcase__item'>{ props.children }</li>
        }
        {
            props.items.map( item =>
                <li className='showcase__item' key={props.keys(item)}>
                    {
                        props.render(item)
                    }
                </li>
            )
        }
    </ul>

Showcase.defaultProps = {
    items: [],
    render: () => null,
    keys: x => x
}

export default Showcase