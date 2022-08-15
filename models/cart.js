const mongoose = require('mongoose');
const Schema = mongoose.Schema
const cartSchema = new mongoose.Schema({
   item: {
      type: Schema.Types.ObjectId,
      ref: 'products'
   },
   quantity: {
      type: Number,
      required: true,
      default: 1
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
   }
})
module.exports = mongoose.model('cart', cartSchema)