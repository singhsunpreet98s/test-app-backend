const Order = require('../../models/order');
const Product = require('../../models/product');
exports.placeOrder = async (req, res, next) => {
   try {
      const { prod, _id, owner } = req.body;
      const ord = new Order({
         buyer: _id,
         seller: owner,
         product: prod
      })
      const resp = await ord.save()
      if (resp) {
         return res.json({ msg: 'success', data: resp })
      }
   }
   catch (err) {
      return res.status(400).json({ msg: 'error' })
   }
}
exports.userOrder = async (req, res, next) => {
   try {
      const { _id } = req.body;
      await Order.find({ buyer: _id })
         .populate({ path: 'product', select: '-_id productTitle price' })
         .exec((err, order) => {
            if (err) {
               return res.json({ msg: 'error' })
            }
            if (order) {
               return res.json({ msg: 'success', data: order })
            }
         })
   }
   catch (err) {
      res.status(201).json({ msg: 'error' })
   }
}