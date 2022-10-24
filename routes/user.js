const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

/* GET List Category. */
router.get('/user',  userController.index );
router.get('/user/create', userController.create);
router.post('/user/create', userController.store);
router.get('/user/delete/:id', userController.destroy);
router.get('/user/edit/:id', userController.edit);
router.post('/user/edit/:id', userController.update);  
module.exports = router;