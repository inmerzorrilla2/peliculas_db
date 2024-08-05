const catchError = require('../utils/catchError');
const Genre = require('../models/Genre');
const { where } = require('sequelize');

const getAll = catchError(async (req, res) => {
    const result = await Genre.findAll()
    return res.json(result);
});

const Create = catchError(async (req, res) => {
    const result = await Genre.create(req.body)
    return res.status(201).json(result)
})

const getOne = catchError(async(req, res) =>{
    const {id} = req.params
    const result = await Genre.findByPk(id)
    if (!result) return res.status(404).json(result)
        return res.json(result)
})

const Destroy = catchError(async(req, res) =>{
    const {id} = req.params
    const result = await Genre.destroy({where: {id}})
    if (!result) return res.status(404).json(result)
        return res.json(result)
})

const Update = catchError(async(req, res) =>{
    const {id} = req.params
    const result = await Genre.update(req.body, {where: {id}})
    if (result[0] === 0) return res.status(304).json(result)
        return res.json(result)
})


module.exports = {
    getAll, 
    Create, 
    getOne,
    Destroy,
    Update
};