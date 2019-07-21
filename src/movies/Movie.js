import React from 'react'

import Actor from './Actor'
import AddToCollection from '../collections/AddToCollection'
import Rating from './Rating'

import './Movie.css'

const Movie = props =>
  <div className='movie'>
    {
      props.poster_path &&
      <img className='movie__poster' src={props.poster_path} alt={props.title} />
    }
    <h1 className='movie__title'>
      {props.title}
      {
        props.release_year &&
        <span className='movie__release_year'>({props.release_year})</span>
      }
      {
        props.tagline &&
        <small className='movie__tagline'>
          {props.tagline}
        </small>
      }
    </h1>
    <Rating name='rating' value={props.rating} onChange={props.onRating} />
    {
      props.genres && props.genres.length > 0 &&
      <ul className='movie__genres'>
        {
          props.genres.map(({ id, name }) =>
            <li key={id} className='enumeration'>{name}</li>
          )
        }
      </ul>
    }
    <p className='movie__plot'>{props.overview}</p>
    <section className='movie__collections'>
      <h2 className='movie__collections_title'>Colecciones</h2>
      <ul className='movie__collections_list'>
        {
          props.collections.map(collection =>
            <li
              key={collection.slug}
              className='enumeration movie__collection'
              onClick={() => props.onRemove(collection.slug)}
            >
              {collection.title}
            </li>
          )
        }
      </ul>
    <AddToCollection
        onAdd={props.onAdd}
        onCreate={props.onCreateCollection}
      />
    </section>
    {
      props.credits && props.credits.cast &&
      <>
        <h2 className='movie__cast_title'>Reparto</h2>
        <ul className='movie__cast'>
          {
            props.credits.cast.slice(0, 5).map(castMember =>
              <li key={castMember.cast_id} className='movie__castmember'>
                <Actor details={castMember}>
                  {castMember.character}
                </Actor>
              </li>
            )
          }
        </ul>
      </>
    }
  </div>

Movie.defaultProps = {
  collections: []
}

export default Movie
