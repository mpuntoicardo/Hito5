const express = require('express');
const userController = require('../controllers/userController');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router();

// Method and end of url needed to access each controller
router.get('/:userId', checkAuth, userController.getUser);
router.post('/', userController.createUser);
router.post('/login', userController.login);
router.patch('/:userId', checkAuth, userController.editUser);
router.delete('/:userId', checkAuth, userController.deleteUser);

module.exports = router;
