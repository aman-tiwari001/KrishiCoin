const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verify');

// create user
router.post('/create-user', userController.connectWallet);

// get user
router.get('/profile/:id', verifyToken, userController.getUser);

module.exports = router;
