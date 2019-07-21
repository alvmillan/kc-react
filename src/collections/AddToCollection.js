import PropTypes from 'prop-types'
import React from 'react'

import withApi from '../core/withApi'
import withLoading from '../core/withLoading'

import './AddToCollection.css'

class AddToCollection extends React.Component {
  state = {}
  async componentDidMount () {
    const collections = await this.props.onLoad(async () =>
      this.props.api.movieCollections()
    )
    this.setState({ collections })
  }
  render () {
    const { collections = [], chosen = 0 } = this.state
    return (
      <form onSubmit={this.submit}>
        <label className='add_collection__selector'>
          Añadir a la colección:&nbsp;
          <select value={chosen} onChange={this.select}>
            <option value='0'>Ninguna</option>
            {
              collections.map(collection =>
                <option key={collection.slug} value={collection.slug}>
                  {collection.title}
                </option>
              )
            }
          </select>
        </label>
        <input
          className='button button--primary add_collection__button'
          type='submit'
          value='Añadir'
        />
        <button className='button' onClick={this.props.onCreate}>
          Crear Nueva
        </button>
      </form>
    )
  }
  submit = event => {
    event.preventDefault()
    const { chosen } = this.state
    this.setState({ chosen: 0 })
    this.props.onAdd(chosen)
  }
  select = event => this.setState({ chosen: event.target.value })
}

const enhanced = withLoading(withApi(AddToCollection))
enhanced.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCreate: PropTypes.func
}
enhanced.defaultProps = {
  onAdd: () => undefined,
  onCreate: () => undefined
}

export default enhanced
