import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

import MovieShowcase from './MovieShowcase'
import { routes } from '../Routes'
import withApi from '../core/withApi'
import withLoading from '../core/withLoading'

class SearchResults extends React.Component {
  state = {}
  async componentDidMount () {
    const movies = await this.props.onLoad(() =>
      this.props.api.search(this.props.query)
    )
    this.setState({ movies })
  }
  render () {
    const { movies = [] } = this.state
    const isEmpty = movies.length === 0
    if (isEmpty) {
      return (
        <p>
          No movie found.&nbsp;
          <Link className='link' to={routes.popularMovies()}>
            See movies
          </Link>
        </p>
      )
    }
    return (
      <MovieShowcase movies={movies}>
        <h1>Search results</h1>
      </MovieShowcase>
    )
  }
}

const enhanced = withLoading(withApi(SearchResults))

enhanced.propTypes = {
  query: PropTypes.string.isRequired
}

export default enhanced