import PropTypes from 'prop-types'
import React from 'react'

import withApi from '../core/withApi'

import './NewCollectionForm.css'

class NewCollectionForm extends React.Component {
  state = { title: '' }
  render () {
    const { title } = this.state
    return (
      <div className='new_collection'>
        <h1 className='new_collection__form_title'>Añadir Colección</h1>
        <form className='new_collection__form' onSubmit={this.submit}>
          <label className='new_collection__name'>
            Nombre:
            <input
              className='new_collection__name_input'
              name='title'
              value={title}
              onChange={this.update}
            />
          </label>
          <input
            className='button button--primary new_collection__create_button'
            type='submit'
            value='Crear Colección'
          />
          <input
            className='button button--dismiss'
            type='reset'
            value='Cancelar'
            onClick={this.props.onCancel}
          />
        </form>
      </div>
    )
  }
  update = ({ target }) => this.setState({ [target.name]: target.value })
  submit = event => {
    event.preventDefault()
    const added = this.props.api.addCollection(this.state)
    this.props.onSubmit(added)
  }
}

const enhanced = withApi(NewCollectionForm)

enhanced.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
}
enhanced.defaultProps = {
  onSubmit: () => undefined,
  onCancel: () => undefined
}

export default enhanced
