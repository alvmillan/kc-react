import React from 'react'
import { withRouter } from 'react-router-dom'
import { routes } from '../Routes'

class SearchInput extends React.Component {
    state = {}

    render() {
        const { query = '' } = this.state

        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    type='search'
                    name='query'
                    placeholder='Search'
                    value={query}
                    onChange={this.onValueChanges}
                />
            </form>
        )
    }

    onValueChanges = (target) => this.setState({[target.name]: target.value})

    onSubmit = e => {
        e.preventDefault()
        const { query = '' } = this.state

        if( query.trim() > 0) {
            this.props.history.push(routes.searchResults(query ))
        }

    }
}

export default withRouter(SearchInput)