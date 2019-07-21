import React from 'react'

import withApi from '../core/withApi'
import withLoading from '../core/withLoading'

class MovieDetails extends React.Component {
    state = {}
    componentDidMount() {
        const {movieId} = this.props
        this.setState(movieId)
    }
    render() {
        return ( <h1>{this.movieId}</h1>)
    }
}

export default withLoading(withApi(MovieDetails))