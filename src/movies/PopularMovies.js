import React from 'react'

import MovieShowcase from './MovieShowcase'
import withApi from '../core/withApi'
import withLoading from '../core/withLoading'

class PopularMovies extends React.Component {
    state = { movies: []}
    async componentDidMount() {
        const movies = await this.props.onLoad( async () => ['a','b', 'c'])
        this.setState({ movies })
    }

    render() {
        const { movies } = this.state;
        return (
            <MovieShowcase movies={movies}>
                <h1>Popular Movies</h1>
            </MovieShowcase>
        )
    }
}

export default withLoading(withApi(PopularMovies))