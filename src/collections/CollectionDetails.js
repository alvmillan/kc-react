/* eslint-env browser */
import React from 'react'
import { withRouter, Link } from 'react-router-dom'

import MovieShowcase from '../movies/MovieShowcase'
import { routes } from '../Routes'
import withApi from '../core/withApi'
import withLoading from '../core/withLoading'

import './CollectionDetails.css'

class CollectionDetails extends React.Component {
  state = {}
  async componentDidMount () {
    const details = await this.props.onLoad(async () =>
      this.props.api.collection(this.props.collectionId)
    )
    this.setState({ details })
  }
  render () {
    const { details = {} } = this.state
    const { movies = [] } = details
    const isEmpty = movies.length === 0
    return (
      <MovieShowcase movies={details.movies}>
        <h1 className='collection__title'>
          {details.title}
          {
            !isEmpty &&
            <button className='button' onClick={this.deleteCollection}>
              Eliminar
            </button>
          }
        </h1>
        {
          isEmpty &&
          <p>
            La colección está vacía. Puedes&nbsp;
            <span className='link' onClick={this.deleteCollection}>
              eliminarla pulsando aquí
            </span>&nbsp;
            o continuar navegando y añadir películas.&nbsp;
            <Link className='link' to={routes.popularMovies()}>
              Ver películas
            </Link>
          </p>
        }
      </MovieShowcase>
    )
  }
  deleteCollection = () => {
    // confirm no es la mejor solución. En una aplicación real usaríamos un
    // elemento de interfaz de usuario hecho por nosotros.
    // eslint-disable-next-line no-restricted-globals
    if (confirm('¿Estás seguro de que quieres borrar la colección?')) {
      this.props.api.deleteCollection(this.props.collectionId)
      // history viene dado por withRouter
      this.props.history.push(routes.movieCollections())
    }
  }
}

export default withRouter(withLoading(withApi(CollectionDetails)))
