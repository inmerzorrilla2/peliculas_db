const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

const getAll = catchError(async (req, res) => {
    const result = await Movie.findAll({include:[Genre, Actor, Director]})
    return res.json(result);
});

const Create = catchError(async(req, res) => {
    const result = await Movie.create(req.body)
    return res.json(result)
});

const getOne = catchError(async(req, res) => {
    const {id} = req.params
    const result = await Movie.findByPk(id)
    if (!result) return res.status(404).json(result)
        return res.json(result)
});

const Destroy = catchError(async(req, res) =>{
    const {id} = req.params
    const result = await Movie.destroy({where: {id}})
    if (!result) return res.status(404).json(result)
        return res.json(result)
});

const Update = catchError(async(req, res) => {
    const {id} = req.params
    const result = await Movie.update(req.body, {where: {id}})
    if (result[0]===0) return res.status(304).json(result)
        return res.json(result)
})

// POST -> /movies/:id/genres
const setGenres = catchError(async(req, res) =>{
    const {id} = req.params
    const movie = await Movie.findByPk(id)
    await movie.setGenres(req.body)
    const genre = await movie.getGenres()
    return res.json(genre)
})

// POST -> /movies/:id/actors

const setActors = catchError(async(req, res) => {
    const {id} = req.params
    const movie = await Movie.findByPk(id)
    await movie.setActors(req.body)
    const actors = await movie.getActors()
    return res.json(actors)
})

// POST -> /movies/:id/directors

const setDirectors = catchError(async(req, res) =>{
    const {id} = req.params
    const movie = await Movie.findByPk(id)
    await movie.setDirectors(req.body)
    const directors = await movie.getDirectors()
    return res.json(directors)
})

module.exports = {
    getAll,
    Create, 
    getOne,
    Destroy,
    Update, 
    setGenres,
    setActors,
    setDirectors
};