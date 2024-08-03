const mongoose = require('mongoose')

const shoeSchema = new mongoose.Schema(
  {
    model: { type: String, required: true },
    price: { type: Number },
    img: { type: String }
  },
  {
    timestamps: true,
    collection: 'shoes'
  }
)

const Shoe = mongoose.model('shoes', shoeSchema, 'shoes')

module.exports = Shoe
