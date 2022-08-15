const mongoose = require('mongoose');
const Schema = mongoose.Schema
const orderSchema = mongoose.Schema({
   buyer: {
      type: Schema.Types.ObjectId,
      ref: 'user',
   },
   seller: {
      type: Schema.Types.ObjectId,
      ref: 'user',
   },
   product: {
      type: Schema.Types.ObjectId,
      ref: 'products',
   },
   status: {
      type: String,
      enum: ['pending', 'placed', 'shipped', 'delieverd'],
      default: 'pending'
   }
}, { timestamps: true })

module.exports = mongoose.model('orders', orderSchema)