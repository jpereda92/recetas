const { where } = require('sequelize');
const Swal = require('sweetalert2');
const recetaModel = require('../models').receta;
const pasosModel = require('../models').pasos;
const ingredientesModel = require('../models').ingrediente;
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
    categoryModel.findAll().then((recetas) => {
        response.render('receta/recetacreate',  { title: 'Adicionar una Receta', listacategoria: recetas, nombre: require.session.name, rol:  require.session.rol,});
   
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
            if(err) 
                return response.status(500).send({ message : err })
            }
        );
        const data = require.body;
        data['image'] = './img/'+foto.name;
        data['id_usuario']=  require.session.id_usuario;
        let pasos =data.paso;
        let ingrediente = data.ingrediente;
        data['ingredientes']=[];
        if(!Array.isArray(ingrediente))
        data['ingredientes'].push({'nombre': ingrediente, 'cantidad': data.cantidades, 'unidad_medida': data.medida});
        else
        for (let i = 0; i < ingrediente.length; i++) {
            data['ingredientes'].push({'nombre': ingrediente[i], 'cantidad': data.cantidades[i], 'unidad_medida': data.medida[i]});
        }
        data['pasos'] = [];
        if(!Array.isArray(pasos))
            data['pasos'].push({'paso': pasos});
        else
            pasos.forEach((paso) =>{
                data['pasos'].push({'paso': paso});
            }
        ) 
        recetaModel.create(data, {include: [{model:pasosModel}, {model:ingredientesModel}]}).then((productDatas)=>{
                    response.redirect('/receta');
                }
            ).catch((err) => {
                response.redirect('/receta/create');
            }
        );
    }
    else
        response.redirect('/');
}
function edit(require, response){
    if(require.session.loggedin){
    const id = require.params.id;  
    categoryModel.findAll().then((categoria) => { 
    recetaModel.findByPk(id, { include: [{model:pasosModel}, {model:ingredientesModel}] }).then((recetas) => {
            response.render('receta/recetaedit',  { title: 'Actualizar receta', listacategoria:categoria,  listarecetas: recetas, nombre:  require.session.name, rol: require.session.rol,});
        }).catch((error) => {
            response.json(error);
        }
        )
    }).catch((err) => {
        response.redirect('/');
    });
    }else
    response.redirect('/');
}
function update(require, response) {
    if(require.session.loggedin){
        const id = require.params.id;
        const data = require.body;
        let pasos =data.paso;
        data['pasos'] = [];
        if(!Array.isArray(pasos))
            data['pasos'].push({'id_receta': id, 'paso': pasos});
        else{
                pasos.forEach((paso) =>{
                    data['pasos'].push({'id_receta': id, 'paso': paso});
                        }
                    ) 
            }
            if(require.files.image) {
        let foto = require.files.image;
        const dates =now.getTime();
        foto.mv(`./public/img/${dates+datesfoto.name}`,err => {
            if(err) 
                return response.status(500).send({ message : err })
            }
        );
        
        data['image'] = './img/'+dates+foto.name;
        }
        data['id_usuario']=  require.session.id_usuario;
        
        let ingrediente = data.ingrediente;
        data['ingredientes']=[];
        if(!Array.isArray(ingrediente))
        data['ingredientes'].push({'nombre': ingrediente, 'cantidad': data.cantidades, 'unidad_medida': data.medida});
        else
        for (let i = 0; i < ingrediente.length; i++) {
            data['ingredientes'].push({'nombre': ingrediente[i], 'cantidad': data.cantidades[i], 'unidad_medida': data.medida[i]});
        }
        let returnlistlist=true;
        recetaModel.update(data, {where:{id: id},}).then((productDatas)=>{
            pasosModel.destroy(
                {
                    where: {id_receta: id}
                }
            ).then((value) => {
                pasosModel.bulkCreate(data['pasos']).then((value2) => {
            
                }).catch((erro) => {
                    returnlistlist=false;
                    }
                );
            }).catch((err2) => {
                returnlistlist=false;
            });

            ingredientesModel.destroy(
                {
                    where: {id_receta: id}
                }
            ).then((value) => {
                ingredientesModel.bulkCreate(data['ingredientes']).then((value2) => {

                }).catch((erro) => {
                    returnlistlist=false;
                });
            }).catch((err2) => {
                returnlistlist=false;
            });
            returnlistlist?response.redirect('/receta'):response.redirect('/receta/edit/'+id);
            }).catch((err) => {
              console.log(err);
               response.redirect('/receta/edit/'+id);
            }
        );
    }
    else
    response.redirect('/');
}
function destroy(require, response) {
    if(require.session.loggedin){
    const id = require.params.id;
    recetaModel.destroy(
        {
            where: {id: id}
        }
    ).then((value) => {
        response.redirect('/receta');
        }
    ).catch((err) => {
        response.redirect('/receta');
        }
    );
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