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
        this._storage.setItem(JSON.stringify(content))
    }

    _updateDb(newDb) {
        this._db = {
            ...this._db(),
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

    _movieMap(movie) {
        return {
            ...map(movie)
        }
    }
}

export default Api