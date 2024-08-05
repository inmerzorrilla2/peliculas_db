const catchError = require('../utils/catchError');
const Director = require('../models/Director');

const getAll = catchError(async (req, res) => {
    const result = await Director.findAll()
    return res.json(result);
});

const Create = catchError(async(req, res) => {
    const result = await Director.create(req.body)
    return res.json(result)
});

const getOne = catchError(async(req, res) => {
    const {id} = req.params
    const result = await Director.findByPk(id)
    if (!result) return res.status(404).json({msg: 'User not found'})
        return res.json(result)
});

const Destroy = catchError(async(req, res) => {
    const {id} = req.params
    const result = await Director.destroy({where: {id}})
    if (!result) return res.status(404).json({msg: `User ${id} not found`})
        return res.json(result)
});

const Update = catchError(async(req, res) => {
    const {id} = req.params
    const result = await Director.update(req.body, {where: {id}})
    if (result[0] === 0) return res.status(304).json({msg: 'User not found'})
        return res.json(result[0])

})

module.exports = {
    getAll,
    Create,
    getOne,
    Destroy,
    Update
};