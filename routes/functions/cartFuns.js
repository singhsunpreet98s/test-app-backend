const Cart = require('../../models/cart')
exports.getCart = (req, res, next) => {
   console.log(req.body._id)
   Cart.find({ user: req.body._id })
      .select('-_id -user -__v')
      .populate({ path: 'item', select: '-productDesc -createdAt -updatedAt -user -__v', populate: { path: 'owner', select: { '_id': 0, 'firstName': 1 } } })
      .exec((err, cart) => {
         if (err) {
            console.log(err)
            return res.json({ msg: 'error' })
         }
         if (cart) {
            return res.json({ data: cart })
         }
      })
}
exports.addToCart = async (req, res, next) => {
   try {
      const cart = new Cart({
         item: req.body.item,
         user: req.body._id
      })
      const crt = await cart.save()
      return res.json({
         msg: 'success',
         cart: cart
      })
   }
   catch (e) {
      console.log(e);
      return res.json({ msg: 'error' })
   }
}