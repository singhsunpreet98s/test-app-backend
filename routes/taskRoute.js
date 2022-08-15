const express = require('express');
const router = express.Router();
const { authenticate } = require('./middlewares/authentications');
const { getTasks } = require('./functions/taskFuns');
const { addTask } = require('./functions/taskFuns');
const { addTaskComments } = require('./functions/taskFuns');
const { body, validationResult } = require('express-validator');

router.get('/getTasks',
   authenticate,
   getTasks);
router.post('/addTask',
   authenticate,
   body('taskTitle').isLength({ min: 2 }),
   body('taskDescription').isLength({ min: 5 }),
   body('taskPrioirty').isLength({ min: 2 }),
   addTask);

// addTaskComments
router.post('/addTaskComments',
   authenticate,
   body('comment').isLength({ min: 2 }),
   body('taskId').isLength({ min: 5 }),
   addTaskComments);
module.exports = router