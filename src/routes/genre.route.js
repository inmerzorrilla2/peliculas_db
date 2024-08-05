const { getAll, Create, getOne, Destroy, Update } = require('../controllers/genre.controller');
const express = require('express');

const routerGenre = express.Router();

routerGenre.route('/')
    .get(getAll)
    .post(Create)

routerGenre.route('/:id')
    .get(getOne)
    .delete(Destroy)
    .put(Update)

module.exports = routerGenre;