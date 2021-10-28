'use strict'

const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
// var bodyParser = require('body-parser')

//Ejecutar express
const app = express();

//Socket
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {origin : '*'}
});

io.on('connection',function(socket){
    
    socket.on('delete-cart',function(data){
        io.emit('new-cart',data);
    });

    socket.on('add-cart-add',function(data){
        io.emit('new-cart-add',data);
        console.log(data);
    });
});
//DDBB
dbConnection();

//Directorio publico
app.use(express.static('public'));

//Configurar cors
app.use(cors());

//Lectura y parseo del body
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Rutas
app.use('/api/client', require('./routes/Client'));
app.use('/api/admin', require('./routes/Admin'));
app.use('/api/product', require('./routes/Product'));
app.use('/api/cupon', require('./routes/Cupon'));
app.use('/api/config', require('./routes/Config'));
app.use('/api/cart', require('./routes/Cart'));
//Escuchar peticiones
server.listen(process.env.PORT ,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});

