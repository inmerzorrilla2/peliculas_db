const catchError = require('../utils/catchError');
const Actor = require('../models/Actor');

const getAll = catchError(async (req, res) => {
    const result = await Actor.findAll()
    return res.json(result);
});

const create = catchError(async (req, res) => {
    const result = await Actor.create(req.body)
    return res.json(result);
});

const getOne = catchError(async (req, res) => {
    const {id} = req.params
    const result = await Actor.findByPk(id)
    if(!result) return res.json({
         data: `User ${id} not found`
    })
    return res.json(result);
});

const Destroy = catchError(async (req, res) => {
    const {id} = req.params
    const result = await Actor.destroy({where:{id}})
    if(!result) return res.json({
         data: `User ${id} not found`
    })
    return res.json(result);
});

const update = catchError(async (req, res) => {
    const {id} = req.params
    const result = await Actor.update(req.body, {where:{id}, returning: true})
    if(result[0]===0) return res.sendStatus(304).json({
         data: `User ${id} not found`
    })
    return res.json(result);
});

module.exports = {
    getAll,
    create,
    getOne,
    Destroy, 
    update
};