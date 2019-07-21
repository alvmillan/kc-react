import React from 'react'

const Showcase = props =>
    <ul>
        {
            props.children &&
            <li>{ props.children }</li>
        }
        {
            props.items.map( item =>
                <li key={props.keys(item)}>
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