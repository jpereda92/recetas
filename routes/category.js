const express = require('express');
const categoryController = require('../controller/categoryController');
const router = express.Router();

/* GET List Category. */
router.get('/category',  categoryController.index );
router.get('/category/create', categoryController.create);
router.post('/category/create', categoryController.store);
router.get('/category/delete/:id', categoryController.destroy);
router.get('/category/edit/:id', categoryController.edit);
router.post('/category/edit/:id', categoryController.update);  
module.exports = router;