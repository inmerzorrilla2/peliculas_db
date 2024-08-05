const { getAll, Create, getOne, Destroy, Update, setGenres, setActors, setDirectors } = require('../controllers/movie.controller');
const express = require('express');
const routerActor = require('./actor.router');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(Create)

routerMovie.route('/:id/genres')
    .post(setGenres)

routerMovie.route('/:id/actors')
    .post(setActors)

routerMovie.route('/:id/directors')
    .post(setDirectors)

routerMovie.route('/:id')
    .get(getOne)
    .delete(Destroy)
    .put(Update)

module.exports = routerMovie;