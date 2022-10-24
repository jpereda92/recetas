const bcryptjs = require('bcryptjs');
const session = require('express-session');
const { where } = require('sequelize');
const userModel = require('../models').usuario;

function index(require, response) {
    if(require.session.rol =="Administrador"){
  
        userModel.findAll().then(usuario=> {
            response.render('users/userlist',  { title: 'Usuario', listausuario: usuario, nombre:  require.session.name, rol:  require.session.rol,});
        }
    ).catch((err) => {
            response.redirect('/');
        }
    );
    // require.getConnection((error, conection)=> {
    //     conection.query('SELECT * FROM usuario', (error, users)=>{
    //         if(error){
    //            response.json(error); 
    //         }
    //         response.render('users/userlist',  { title: 'Usuario', listausuario: users, nombre:  require.session.name, rol:  require.session.rol,});
            
    //     });
    // });
    } else
        response.redirect('/');
  
}

function  create(require, response) {
    if(require.session.rol =="Administrador")
    response.render('users/usercreate',  { title: 'Adicionar un nuevo Ususario', nombre:  require.session.name, rol:  require.session.rol, });
    else
    response.redirect('/');
}

async function  store(require, response) {
    if(rol =="Administrador"){
        let datas = require.body; 
        const hashpassword = await bcryptjs.hash(data.password, 8);
        data.password = hashpassword; 
        userModel.create(datas).then((data)=>{
            response.redirect('/user');
            })
    // let data = require.body;
    // const hashpassword = await bcryptjs.hash(data.password, 8);
    // data.password = hashpassword;
    // require.getConnection((error, conection)=> {
    //     conection.query('INSERT INTO usuario SET?', [data], (error, rows)=>{
    //         response.redirect('/user');
    //     });
    // });
}else
response.redirect('/');
}
function edit(require, response){
    if(require.session.rol =="Administrador"){
    const id = require.params.id;
    userModel.findByPk(id).then(user=>{
        response.render('users/useredit',  { title: 'Actualizar un Usuario', user: user, nombre: require.session.name, rol:  require.session.rol,});   
        }
    ).catch((error)=>{
        response.redirect('/user');
        }
    );
    // require.getConnection((error, conection)=> {
    //     conection.query('SELECT * FROM usuarios WHERE id =?', [id], (error, user)=>{
    //         if(error){
    //            response.json(error); 
    //         }
    //         response.render('users/useredit',  { title: 'Actualizar una Categoría', user: user, nombre:  require.session.name, rol:  require.session.rol,});
            
    //     });
    // });
    }else
    response.redirect('/');
}
function update(require, response) {
    if(require.session.rol =="Administrador")
    {
        const id = require.params.id;
        const data = require.body;
        userModel.update(data, {
            where: {id: id}
        }
    ).then(
        usuario=> {
        response.redirect('/user');
        }
    ).catch((error)=>{
        response.redirect('/user');
        }
    );
}
else
response.redirect('/');
}
function destroy(require, response) {
    if(require.session.rol =="Administrador"){
    const id = require.params.id;
    userModel.destroy(
            {
                where: {id: id}
            }
        )
        .then((data)=>{
        response.redirect('/user');
        }
    ).catch((err) => {
        response.redirect('/user');
        }
    );
}
else
    response.redirect('/');
}
function login(require, response) {
    response.render('login',  { title: 'Login'});
    }
async function loguearse(require, response) {
        const user = require.body.user;
        const pass = require.body.contrasena;
        let hashpassword = await bcryptjs.hash(pass, 8);
        if(user && pass){
            userModel.findOne({ where: { user: user } }).then(async (users) => {
                if(users.length == 0 || !(await bcryptjs.compare(pass, users.password))){
                    console.log(users);
                    response.redirect('/login');
                    }
                    else
                    {
                        require.session.loggedin = true;
                        require.session.user = users.user;
                        require.session.rol = users.rol;
                        require.session.name = users.name;
                        response.redirect('/receta');
                    }
                }
            ).catch((error)=>{
                response.redirect('/login');
                }
            );
        //     require.getConnection((error, conection)=> {
        //     conection.query('SELECT * FROM usuarios WHERE user = ?', [user], async(error, users)=>{
                
        //         if(users.length == 0 || !(await bcryptjs.compare(pass, users[0].password))){

        //         response.redirect('/login');
        //         }
        //         else{
        //         require.session.loggedin = true;
        //         require.session.user = users[0].user;
        //         require.session.rol = users[0].rol;
        //         require.session.name = users[0].name;

        //         response.redirect('/receta');
        //     }
                
        //     }
        //     );
        //  }
        //  );
        }
        else
            response.redirect('/login');
        }
        function logout(require, response) {
            require.session.destroy();
            response.redirect('/login');
            }

module.exports = {
    index: index,
    create: create,
    store:  store,
    destroy: destroy,
    edit: edit,
    update: update,
    login: login,
    loguearse: loguearse,
    logout: logout,
}