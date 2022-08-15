const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
   taskTitle: {
      type: String,
      min: 3,
      max: 200,
      required: true
   },
   taskDescription: {
      type: String,
      mix: 3,
      max: 500,
      required: true
   },
   taskPrioirty: {
      type: String,
      required: true
   },
   isdeleted: {
      type: Boolean,
      required: true,
      default: 0
   },
   addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'tasks',
      required: true
   },

   parentId: {
      type: Schema.Types.ObjectId,
      ref: 'tasks'
   },
   taskComments: [{
      type: Schema.Types.ObjectId,
      ref: 'taskComments'
   }]

}, { timestamps: true });

module.exports = mongoose.model('tasks', taskSchema)