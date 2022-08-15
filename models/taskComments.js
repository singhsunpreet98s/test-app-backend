const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const taskCommentsSchema = new mongoose.Schema({
   comment: {
      type: String,
      min: 3,
      max: 500,
      required: true
   },
   parent: {
      type: Schema.Types.ObjectId,
      ref: 'taskComments'
   },
   seenBy: [{
      user_id: {
         type: Schema.Types.ObjectId,
         ref: 'tasks'
      },
      seenAt: Date
   }
   ],
   addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'tasks',
      required: true
   },
   task: {
      type: Schema.Types.ObjectId,
      ref: 'tasks'
   },
   isdeleted: {
      type: Boolean,
      required: true,
      default: 0
   },
   user_id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
   }

}, { timestamps: true });

module.exports = mongoose.model('taskComments', taskCommentsSchema);