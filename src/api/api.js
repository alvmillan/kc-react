import slug from 'slug'

import map from './movieMapper'

class Api {
    constructor (conf, storage, fetch) {
        this._conf = conf
        this._storage = storage
        this._fetch = fetch
    }

    get _db() {
        return JSON.parse(this._storage.getItem(this._conf.storeKey)) || {}
    }
    set _db(content) {
        this._storage.setItem(this._conf.storeKey, JSON.stringify(content))
    }

    _updateDb(newDb) {
        this._db = {
            ...this._db,
            ...newDb
        }
    }

    async _request(endpoint, query = '') {
        const { apiUrl, apiKey, language } = this._conf
        const url = `${apiUrl}${endpoint}?api_key=${apiKey}&language=${language}`
        const apiResponse = await fetch(`${url}${query}`)
        const responseBody = await apiResponse.json()
        return responseBody
    }

    async popularMovies() {
        const { results: popularMovies } = await this._request('/movie/popular')
        return popularMovies.map(this._movieMap.bind(this))
    }

    async movieDetails (movieId) {
        const movie = await this._request(
          `/movie/${movieId}`,
          '&append_to_response=credits'
        )
        return this._movieMap(movie)
    }

    async search (criteria) {
        const { results = [] } = await this._request(
          '/search/movie',
          `&query=${encodeURI(criteria)}`
        )
        return results.map(this._movieMap.bind(this))
    }


    _movieCollections () {
        return Object.values(this._db.collections || {})
      }
    
    movieCollections () {
        return this._movieCollections()
    }

    addCollection (collection) {
        const { collections = {} } = this._db
        const collectionSlug = slug(collection.title)
    
        collections[collectionSlug] = {
          ...collection,
          slug: collectionSlug,
          movies: []
        }
    
        this._updateDb({ collections })
    
        return collections[collectionSlug]
    }

    _updateCollectionPoster (collection) {
        delete collection.poster
        if (collection.movies.length > 0) {
          collection.poster = collection.movies[0].poster_path
        }
    }
    
    collection (collectionSlug) {
        const { collections = {} } = this._db
        return collections[collectionSlug]
    }
    
    addToCollection (collectionSlug, movie) {
        const { collections } = this._db
        const collection = collections[collectionSlug]
        const { movies = [] } = collection
    
        const alreadyIncluded = movies.find(({ id }) => id === movie.id)
    
        if (!alreadyIncluded) {
          collection.movies = [movie, ...movies]
          if (!collection.poster) {
            this._updateCollectionPoster(collection)
          }
          collections[collectionSlug] = collection
          this._updateDb({ collections })
        }
    }
    
    removeFromCollection (collectionSlug, movieId) {
        const { collections } = this._db
        const collection = collections[collectionSlug]
        const { movies = [] } = collection
    
        collection.movies = movies.filter(({ id }) =>
          id !== Number(movieId)
        )
        this._updateCollectionPoster(collection)
    
        this._updateDb({ collections })
    }
    
    deleteCollection (collectionSlug) {
        const { collections } = this._db
        delete collections[collectionSlug]
        this._updateDb({ collections })
    }
    
    _collectionsIncluding (movie) {
        return this._movieCollections().filter(({ movies = [] }) =>
          movies.some(({ id }) =>
            id === movie.id
          )
        )
    }

    _movieMap(movie) {
        return {
            ...map(movie)
        }
    }

    rateMovie (movieId, rating) {
        const { ratings = {} } = this._db
        ratings[movieId] = rating
        this._updateDb({ ratings })
    }

    movieRating (movieId) {
    const { ratings = {} } = this._db
    return ratings[movieId]
    }
}

export default Api