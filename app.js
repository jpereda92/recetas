
const express = require('express');
const path = require('path');
//const cookieParser = require('cookie-parser');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const Sequelize = require('sequelize');
const sequelizesa= require('./models/index');

// const sequelizesa = new Sequelize('recetas', 'root','',
// {
//   host:'localhost',
//   dialect: 'mysql',
// });

const indexRoute = require('./routes/dashb'); 
const categoryRoute = require('./routes/category'); 
const userRoute = require('./routes/user'); 
const recetaRoute = require('./routes/receta'); 
const loginRoute = require('./routes/login'); 

const app = express();

app.use(express.static(__dirname + '/public/'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.use(session({
    secret:'secreto',
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 60000,
      }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cookieParser());
const conection = require('./db/db');

app.use(conection);

app.use('/', indexRoute);
app.use('/', categoryRoute);
app.use('/', userRoute);
app.use('/', recetaRoute);
app.use('/', loginRoute);
app.get('/kaka', (req, res)=>{
  console.log(modelUser.name); 
});

module.exports = app;