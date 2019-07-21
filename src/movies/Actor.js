import React from 'react'

import './Actor.css'

const Actor = ({ details, children }) =>
  <div className='actor'>
    {
      details.profile_path &&
      <img
        className='actor__picture'
        src={details.profile_path}
        alt={details.name}
      />
    }
    <span className='actor__name'>{details.name}</span>
    <span className='actor__role'>{children}</span>
  </div>

export default Actor
