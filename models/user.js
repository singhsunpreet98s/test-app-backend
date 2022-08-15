const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      min: 3,
      max: 20,
      required: true
   },
   lastName: {
      type: String,
      mix: 3,
      max: 20,
      required: true
   },
   email: {
      type: String,
      min: 5,
      max: 50,
      required: true
   },
   hashPassword: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      min: 5,
      max: 20,
      required: true
   },
   admin: {
      type: Boolean,
      default: false
   },
   // productItems: [{
   //    type: mongoose.Schema.Types.ObjectId,
   //    ref: 'products'
   // }]

}, { timestamps: true });
userSchema.virtual('password').set(function (pass) {
   this.hashPassword = bcrypt.hashSync(pass, 8)
})
userSchema.virtual('name').get(function () {
   return `${this.firstName} ${this.lastName}`
})
userSchema.methods = {
   authenticate: function (pass) {
      return bcrypt.compareSync(pass, this.hashPassword)
   }
}
module.exports = mongoose.model('user', userSchema)