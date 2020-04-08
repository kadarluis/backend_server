var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();

//IMPORT SCHEMA USUARIOS
var usuario = require('../models/user');

app.post('/', (req, res) => {

    var body = req.body;

    usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Usuarios',
                errors: err
            });
        }

        // Verifico si el correo no esta vacio
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        // Verifico si la contraseña no esta vacio
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        // Crear Token
        usuarioDB.password = ':P'; //Ocultar pasword
        var token = jwt.sign({ payload: usuarioDB }, SEED, { expiresIn: '1h' }); //Genero Token


        res.status(201).json({
            ok: true,
            usuarioDB: usuarioDB,
            id: usuarioDB._id,
            token: token
        });
    });



});



module.exports = app;