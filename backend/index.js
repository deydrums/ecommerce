'use strict'

const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//Ejecutar express
const app = express();

//DDBB
dbConnection();

//Directorio publico
app.use(express.static('public'));

//Configurar cors
app.use(cors());


//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/client', require('./routes/Client'));
app.use('/api/admin', require('./routes/Admin'));
app.use('/api/product', require('./routes/Product'));

//Escuchar peticiones
app.listen(process.env.PORT ,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});

