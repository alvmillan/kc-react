import React from 'react'
import { withRouter } from 'react-router-dom'
import { routes } from '../Routes'

import './SearchInput.css'

class SearchInput extends React.Component {
    state = {}
    render() {
        const { query = '' } = this.state

        return (
            <div className='search-form'>
                <form id="search" noValidate onSubmit={this.onSubmit}>
                    <input 
                        className='search'
                        type='search'
                        name='query'
                        placeholder='Search'
                        value={query}
                        onChange={this.onValueChanges}
                    />
                </form>
                <button className='button button__search' type='submit' form="search">Search</button>
            </div>
        )
    }

    onValueChanges = ({target}) => this.setState({[target.name]: target.value})

    onSubmit = e => {
        e.preventDefault()
        const { query = '' } = this.state
        
        console.log(query);
        if( query.trim().length > 0) {
            this.props.history.push(routes.searchResults(query))
        }

    }
}

export default withRouter(SearchInput)