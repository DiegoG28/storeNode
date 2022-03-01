const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let usuario = {
    nombre: '',
    apellido: ''
};

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

app.get('/', (req, res) => {
    respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Inicio'
    };
    res.send(respuesta);
});

app.post('/usuario', (req, res) => {
    if(!req.body.nombre || !req.body.apellido){
        respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'El campo de nombre y apellido son necesarios'
        }
    }else{
        if(usuario.nombre !== '' || usuario.apellido !== ''){
            respuesta = {
                error: true,
                codigo: 502,
                mensaje: 'El usuario ya fue registrado'
            }
        }else{
            usuario = {
                nombre: req.body.nombre,
                apellido: req.body.apellido
            };

            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'Usuario creado',
                respuesta: usuario
            };
        }
    }
    res.send(respuesta);
})

app.get('/usuario', (req, res) => {
    respuesta = {
        error: false,
        codigo: 200,
        mensaje: ''
    };
    if(usuario.nombre === '' || usuario.apellido === ''){
        respuesta = {
            error: true,
            codigo: 501,
            mensaje: 'Usuario no encontrado'
        };
    }else{
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Usuario',
            respuesta: usuario
        };
    }
    res.send(respuesta);
});

app.listen(3001, () =>  {
    console.log("El servidor está en el puerto 3000");
});
