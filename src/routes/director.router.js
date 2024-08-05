const { getAll, Create, getOne, Destroy, Update } = require('../controllers/director.controller');
const express = require('express');

const routerDirector = express.Router();

routerDirector.route('/')
    .get(getAll)
    .post(Create)

routerDirector.route('/:id')
    .get(getOne)
    .delete(Destroy)
    .put(Update)

module.exports = routerDirector;