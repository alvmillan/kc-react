const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'
const prependImagePath = relativeUrl => `${IMAGE_PATH}${relativeUrl}`

const mapCredits = credits =>
    credits && credits.cast
        ? {
            credits: {
                cast: credits.cast.map(actor => ({
                    ...actor,
                    profile_path: prependImagePath(actor.profile_path)
                }))
            }
        }
        : {}

const mapReleaseYear = releaseDate =>
    releaseDate
        ? {
            release_year: new Date(releaseDate).getFullYear()
        }
        : {}

const mapPoster = posterPath =>
    posterPath
        ? {
            poster_path: prependImagePath(posterPath)
        }
        : {}

const map = movie => ({
    ...movie,
    ...mapPoster(movie.poster_path),
    ...mapCredits(movie.credits),
    ...mapReleaseYear(movie.release_date)
})

export default map