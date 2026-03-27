const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
router.post('/login' , userCtrl.login);
router.post('/create-task',auth, userCtrl.createTask);
router.get('/tasks', auth, userCtrl.getTasks);
router.put('/update-task/:id', auth, userCtrl.updateTask);
router.delete('/delete-task/:id', auth, userCtrl.deleteTask);
router.put('/mark-completed/:id', auth, userCtrl.markTaskCompleted);


module.exports = router;