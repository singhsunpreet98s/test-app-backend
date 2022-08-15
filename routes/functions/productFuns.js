const Product = require('../../models/product')
exports.addProduct = async (req, res, next) => {

   try {
      const { productTitle, productDesc, price, discount, image, _id, brand } = req.body
      const prod = new Product({
         productTitle: productTitle,
         productDesc: productDesc,
         price: price,
         img: image,
         discount: discount,
         owner: _id,
         brand: brand
      })
      await prod.save()
      return res.json({ msg: 'success', prod: prod })
   }
   catch (err) {
      console.log(err)
      return res.json({ msg: 'err' })
   }
}
exports.getProducts = async (req, res, next) => {
   try {
      await Product.find()
         .populate({ path: 'owner', select: " firstName" })
         .select('-createdAt -updatedAt -__v -productDesc')
         .exec((err, data) => {
            if (err) {
               return res.json({ msg: 'error' })
            }
            if (data) {
               res.status(201).json({ msg: "success", products: data })
            }
         })
   }
   catch (err) {
      return res.json({ msg: 'error' })
   }
}
exports.adminProd = async (req, res, next) => {
   try {
      await Product.find({ owner: req.body._id }).select(['discount', 'productTitle', 'price', 'brand'])
         .exec((err, data) => {
            if (err) {
               res.status(401).json({ msg: 'error occured' })
            }
            if (data) {
               res.json({ products: data })
            }
         })
   }
   catch (err) {
      console.log(err)
      res.status(500).json({ msg: 'error' })
   }
}
exports.fetchProd = (req, res, next) => {
   try {
      Product.findOne({ _id: req.body._id }).exec((err, data) => {
         if (err) {
            res.json({ msg: 'error' })
         }
         if (data) {
            res.json({ msg: "success", product: data })
         }
      })
   }
   catch (err) {
      res.json({ msg: 'error' })
   }
}