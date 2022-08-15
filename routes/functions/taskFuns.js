const Tasks = require('../../models/tasks');
const TaskComments = require('../../models/taskComments');
const { validationResult } = require('express-validator');
exports.getTasks = (req, res, next) => {
   Tasks.find({ user: req.body._id, isdeleted: false })
      .select('  -__v')
      .populate('taskComments')
      .exec((err, task) => {
         if (err) {
            console.log(err)
            return res.json({ msg: 'error' })
         }
         if (task) {
            return res.json({ data: task })
         }
      })
}
exports.addTask = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      const task = new Tasks({
         taskTitle: req.body.taskTitle,
         taskDescription: req.body.taskDescription,
         taskPrioirty: req.body.taskPrioirty,
         addedBy: req.body._user_id,
         parentId: (req.body.parentId) ? req.body.parentId : null,

      })
      const crt = await task.save()
      return res.json({
         msg: 'success',
         cart: task
      })
   }
   catch (e) {
      console.log(e);
      return res.json({ msg: 'error', error: e })
   }
}
exports.addTaskComments = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      const taskComment = new TaskComments({
         comment: req.body.comment,
         // taskDescription: req.body.taskDescription,
         taskId: req.body.taskId,
         addedBy: req.body._user_id,
         parent: (req.body.parentId) ? req.body.parentId : null,

      })
      const taskCmt = await taskComment.save()
      return res.json({
         msg: 'success',
         cart: taskCmt
      })
   }
   catch (e) {
      console.log(e);
      return res.json({ msg: 'error', error: e })
   }
}