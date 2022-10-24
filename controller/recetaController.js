const { where } = require('sequelize');
const recetaModel = require('../models').receta;
const categoryModel = require('../models').categoria;
function index(require, response) {
    if(require.session.loggedin)
    recetaModel.findAll({ include: [{model: categoryModel}] }).then((recetas) => {
        response.render('receta/recetalist',  { title: 'Recetas', listarecetas: recetas, nombre:  require.session.name, rol: require.session.rol,});
    }).catch((error) => {
        response.json(error);
    }
);
       else
    response.redirect('/');
}

function create(require, response) {
    if(require.session.loggedin){
      
    categoryModel.findAll().then((categorys) => {
        response.render('receta/recetacreate',  { title: 'Adicionar una Receta', listacategoria: categorys, nombre: require.session.name, rol:  require.session.rol,});
   
    }).catch((err) => {
        response.redirect('/');
    });
    }else
    response.redirect('/');
}

function store(require, response) {
    if(require.session.loggedin){
        let foto = require.files.image;
        foto.mv(`./public/img/${foto.name}`,err => {
            if(err) {
                return res.status(500).send({ message : err })
            }else
                res.redirect('/');
            }
        );
        const data = require.body;
        const productData = {data, imagen: foto.name };
        recetaModel.create(datas).then((productData)=>{
            response.redirect('/receta');
            }).catch((err) => {
                response.redirect('/receta');
            });
    // require.getConnection((error, conection)=> {
    //     conection.query('INSERT INTO categorias SET?', [productData], (error, rows)=>{
    //         response.redirect('/category');
    //     });
    // });
    }else
        response.redirect('/');
}
function edit(require, response){
    if(require.session.loggedin){
    const id = require.params.id;
    require.getConnection((error, conection)=> {
        conection.query('SELECT * FROM categorias WHERE id_categoria =?', [id], (error, category)=>{
            if(error){
               response.json(error); 
            }
            response.render('category/categoryedit',  { title: 'Actualizar una Categoría', categoria: category, nombre: require.session.name, rol: require.session.rol,});
            
        });
    });
    }else
    response.redirect('/');
}
function update(require, response) {
    if(require.session.loggedin){
    const id = require.params.id;
    const data = require.body;
    require.getConnection((error, conection)=> {
        conection.query('UPDATE categorias SET ? WHERE id_categoria =?', [data, id], (error, rows)=>{
            if(error){
                response.json(error); 
             }
            response.redirect('/category');
        });
    });
    }else
    response.redirect('/');
}
function destroy(require, response) {
    if(require.session.loggedin){
    const id = require.params.id;
    require.getConnection((error, conection)=> {
        conection.query('DELETE FROM categorias WHERE id_categoria =?', [id], (error, rows)=>{
            if(error){
                response.json(error); 
             }
            response.redirect('/category');
        });
    });
    }else
    response.redirect('/');
}

module.exports = {
    index: index,
    create: create,
    store: store,
    destroy: destroy,
    edit:edit,
    update: update,
}