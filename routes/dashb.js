var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(require, response, next) {
  if(require.session.loggedin)
  recetaModel.findAll({ include: [{model: categoryModel}, {model:ingredientesModel}] }).then((recetas) => {
  response.render('principal', { title: 'Tablero de Control', nombre:  require.session.name, Listarecetas:recetas , rol:  require.session.rol,});
}).catch((error) => {
  response.json(error);
}
);
  else
  response.redirect('/login');
});

module.exports = router;