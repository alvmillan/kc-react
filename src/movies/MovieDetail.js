import React from 'react'

import Movie from './Movie'
import NewCollectionForm from '../collections/NewCollectionForm'
import withApi from '../core/withApi'
import withLoading from '../core/withLoading'

class MovieDetail extends React.Component {
    state = {}
  async componentDidMount () {
    const { movieId, api } = this.props
    const details = await this.props.onLoad(() =>
      api.movieDetails(movieId)
    )
    this.setState({
      details,
      rating: api.movieRating(movieId)
    })
  }
  render () {
    const {
      details = {},
      rating = 0,
      showingForm
    } = this.state
    if (showingForm) {
      return (
        <NewCollectionForm onSubmit={this.hideForm} onCancel={this.hideForm} />
      )
    }
    return (
      <Movie
        {...details}
        onAdd={this.addToCollection}
        onRemove={this.removeFromCollection}
        onCreateCollection={this.showForm}
        rating={rating}
        onRating={this.rateMovie}
      />
    )
  }
  hideForm = () => this.setState({ showingForm: false })
  showForm = () => this.setState({ showingForm: true })
  addToCollection = async collectionSlug => {
    this.props.api.addToCollection(collectionSlug, this.state.details)
    this.setState({
      details: await this.props.api.movieDetails(this.props.movieId)
    })
  }
  removeFromCollection = async collectionSlug => {
    this.props.api.removeFromCollection(collectionSlug, this.props.movieId)
    this.setState({
      details: await this.props.api.movieDetails(this.props.movieId)
    })
  }
  rateMovie = rating => {
    this.props.api.rateMovie(
      this.props.movieId,
      rating
    )
    this.setState({ rating })
  }
}

export default withLoading(withApi(MovieDetail))