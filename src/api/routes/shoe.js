const {
  insertManyShoes,
  getAllShoes,
  postShoe,
  deleteShoe,
  updateShoe
} = require('../controllers/shoe')

const shoesRouter = require('express').Router()

shoesRouter.post('/robarJDS', insertManyShoes)
shoesRouter.post('/postshoe', postShoe)
shoesRouter.get('/', getAllShoes)
shoesRouter.delete('/:id', deleteShoe)
shoesRouter.put('/:id', updateShoe)

module.exports = shoesRouter
