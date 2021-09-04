'use strict'

const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
var bodyparser = require('body-parser');

//Ejecutar express
const app = express();

//DDBB
dbConnection();

//Directorio publico
app.use(express.static('public'));


app.use(cors());


//Lectura y parseo del body
app.use(express.json());


//Escuchar peticiones
app.listen(process.env.PORT ,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});

