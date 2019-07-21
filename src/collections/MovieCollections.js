import React from 'react'
import { Link } from 'react-router-dom'

import NewCollectionForm from './NewCollectionForm'
import { routes } from '../Routes'
import Showcase from '../movies/Showcase'
import withApi from '../core/withApi'
import withLoading from '../core/withLoading'

import './MovieCollections.css'

// De manera similar a como ocurre en `MovieDetails`, el componente es
// responsable de conmutar entre el formulario para añadir colecciones
// (`NewCollectionForm`) y el `Showcase` de colecciones. En este caso, al
// contrario que en `MovieDetails`, la implementación es lo suficientemente
// breve como para no justificar un componente independiente, aunque tampoco
// sería mala solución.
class MovieCollections extends React.Component {
  state = {}
  async componentDidMount () {
    // En realidad es síncrono, pero en una aplicación real, el api sería
    // remota, y de esta forma todos los componentes tienen una estructura
    // similar.
    const collections = await this.props.onLoad(async () =>
      this.props.api.movieCollections()
    )
    this.setState({ collections })
  }
  render () {
    const { collections = [], adding } = this.state

    if (adding) {
      return (
        <NewCollectionForm
          onSubmit={this.addCollection}
          onCancel={this.hideForm}
        />
      )
    }

    return (
      <Showcase
        items={collections}
        keys={collection => collection.slug}
        render={collection =>
          <Link to={routes.collectionDetails(collection.slug)}>
            <img
              src={collection.poster || 'https://placehold.it/500x700?text=%3F'}
              alt={collection.title}
            />
            <h1 className='movie_collections__collection_title'>
              {collection.title}
              <span className='movie_collections__collection_movie_count'>
                ({collection.movies.length})
              </span>
            </h1>
          </Link>
        }
      >
        <span className='movie_collections__add_new' onClick={this.showForm}>
          <img src='https://placehold.it/500x700?text=%2B' alt='Añadir nueva' />
          <h1 className='movie_collections__collection_title'>
            Añadir nueva
          </h1>
        </span>
      </Showcase>
    )
  }
  showForm = () => this.setState({ adding: true })
  hideForm = () => this.setState({ adding: false })
  addCollection = collection => {
    this.props.api.addCollection(collection)
    this.hideForm()
  }
}

export default withLoading(withApi(MovieCollections))
