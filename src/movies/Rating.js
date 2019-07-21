import React from 'react'
import PropTypes from 'prop-types'

import './Rating.css'

const asNumber = handler => event =>
  handler(Number(event.target.value))
const inputClassName = highlight =>
  `rating__input ${highlight ? 'rating__input--highlight' : ''}`.trim()

const Rating = props =>
  <label className='rating'>
    <input
      className={inputClassName(props.value >= 1)}
      type='radio'
      name={props.name}
      value={1}
      checked={props.value === 1}
      onChange={asNumber(props.onChange)}
    />
    <input
      className={inputClassName(props.value >= 2)}
      type='radio'
      name={props.name}
      value={2}
      checked={props.value === 2}
      onChange={asNumber(props.onChange)}
    />
    <input
      className={inputClassName(props.value >= 3)}
      type='radio'
      name={props.name}
      value={3}
      checked={props.value === 3}
      onChange={asNumber(props.onChange)}
    />
    <input
      className={inputClassName(props.value >= 4)}
      type='radio'
      name={props.name}
      value={4}
      checked={props.value === 4}
      onChange={asNumber(props.onChange)}
    />
    <input
      className={inputClassName(props.value >= 5)}
      type='radio'
      name={props.name}
      value={5}
      checked={props.value === 5}
      onChange={asNumber(props.onChange)}
    />
  </label>
Rating.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default Rating
