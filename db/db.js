
const myconnection  = require('express-myconnection');
const mysql         = require('mysql');

const connection = myconnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'recetas'
}, 'single');


module.exports = connection;