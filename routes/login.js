const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.get('/login',  userController.login );
router.post('/login',  userController.loguearse );
router.get('/logout', userController.logout );

module.exports = router;