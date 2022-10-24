var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(require, response, next) {
  if(require.session.loggedin)
  response.render('principal', { title: 'Tablero de Control', nombre:  require.session.name, rol:  require.session.rol,});
  else
  response.redirect('/login');
});

module.exports = router;