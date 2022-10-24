const { where } = require('sequelize');
const categoryModel = require('../models').categoria;

function index(require, response) {
    if(require.session.rol =="Administrador" || require.session.rol =="Editor")
    categoryModel.findAll().then((categorys) => {
        response.render('category/categorylist',  { title: 'Categoría', listacategoria: categorys, nombre: require.session.name, rol:  require.session.rol,});
   
    }).catch((err) => {
        response.redirect('/');
    }
);
    else
    response.redirect('/');
}
function create(require, response) {
    if(require.session.rol =="Administrador" || require.session.rol =="Editor")
    response.render('category/categorycreate',  { title: 'Adicionar  una Categoría', nombre: require.session.name, rol:  require.session.rol, });
    else
    response.redirect('/');
}



function store(require, response) {
    if(require.session.rol =="Administrador" || require.session.rol =="Editor"){
    const data = require.body;
    categoryModel.create(datas).then((data)=>{
        response.redirect('/category');
        }).catch((err) => {
            response.redirect('/category');
        });
}else
response.redirect('/');
}
function edit(require, response){
    if(require.session.rol =="Administrador" || require.session.rol =="Editor")
    {
        const id = require.params.id;
        categoryModel.findByPk(id).then((category) => {
                response.render('category/categoryedit',  { title: 'Actualizar una Categoría', categoria: category, nombre:  require.session.name, rol:  require.session.rol,});
            }
        ).catch((error)=>{
            response.redirect('/category');
            }
        );
    }
    else
    response.redirect('/');
}
function update(require, response) {
    if(require.session.rol =="Administrador" || require.session.rol =="Editor"){
        const id = require.params.id;
        const data = require.body;
        categoryModel.update(
            {
                where:{id: id},
            }
        ).then((result) => {
                response.redirect('/category');
            }
        ).catch((err) => {
                response.redirect('/category');
            }
        );
        // require.getConnection((error, conection)=> {
        //     conection.query('UPDATE categorias SET ? WHERE id_categoria =?', [data, id], (error, rows)=>{
        //         if(error){
        //             response.json(error); 
        //         }
        //         response.redirect('/category');
        //     });
        // });
    }
    else
        response.redirect('/');
}
function destroy(require, response) {
    if(require.session.rol =="Administrador" || require.session.rol =="Editor"){
        const id = require.params.id;
        categoryModel.destroy(
            {
                where: {id: id}
            }
        ).then((value) => {
            response.redirect('/category');
            }
        ).catch((err) => {
            response.redirect('/category');
            }
        );
    }
    else
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