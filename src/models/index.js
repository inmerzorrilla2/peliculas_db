
const Actor = require('./Actor')
const Director = require('./Director')
const Genre = require('./Genre')
const Movie = require('./Movie')

Movie.belongsToMany(Actor, {through:'movieActor'})  // Relación de película y actor => movieId
Actor.belongsToMany(Movie, {through:'movieActor'})

Movie.belongsToMany(Director, {through:'movieDirector'}) // Relación de película y director => directorId
Director.belongsToMany(Movie, {through:'movieDirector'})

Movie.belongsToMany(Genre, {through:'movieGenre'}) // Relación de película y actor => genreId
Genre.belongsToMany(Movie, {through:'movieGenre'})