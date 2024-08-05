const { getAll, create, getOne, Destroy, update } = require('../controllers/actor.controller');
const express = require('express');

const routerActor = express.Router();

routerActor.route('/')
    .get(getAll)
    .post(create)

routerActor.route('/:id')
    .get(getOne)
    .delete(Destroy)
    .put(update)

module.exports = routerActor;