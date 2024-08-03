const Shoe = require('../models/shoe')
const shoes = require('../../../shoes.json')

const insertManyShoes = async (req, res, next) => {
  try {
    await Shoe.insertMany(shoes.results)
    return res.status(202).json('Todos los juegos subidos a la BBDD')
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

const postShoe = async (req, res, next) => {
  try {
    const newShoe = new Shoe(req.body)
    const shoeSaved = await newShoe.save()
    return res.status(201).json(shoeSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getAllShoes = async (req, res, next) => {
  try {
    const allShoes = await Shoe.find()
    return res.status(200).json(allShoes)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const updateShoe = async (req, res, next) => {
  try {
    const { id } = req.params
    const newShoe = new Shoe(req.body)
    newShoe._id = id

    const shoeUpdated = await Shoe.findByIdAndUpdate(id, newShoe, { new: true })
    return res.status(200).json(shoeUpdated)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteShoe = async (req, res, next) => {
  try {
    const { id } = req.params
    const shoeDeleted = await Shoe.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Elemento eliminado',
      elemento: shoeDeleted
    })
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  insertManyShoes,
  getAllShoes,
  postShoe,
  deleteShoe,
  updateShoe
}
