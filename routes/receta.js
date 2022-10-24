const express = require('express');
const recetaController = require('../controller/recetaController');
const router = express.Router();

/* GET List Category. */
router.get('/receta',  recetaController.index );
router.get('/receta/create', recetaController.create);
router.post('/receta/create', recetaController.store);
router.get('/receta/delete/:id', recetaController.destroy);
router.get('/receta/edit/:id', recetaController.edit);
router.post('/receta/edit/:id', recetaController.update);  
module.exports = router;