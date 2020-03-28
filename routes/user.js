var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');

//IMPORT SCHEMA
var usuario = require('../models/user');


// ========================================================
//  OBTENER TODOS LOS USUARIOS
// ========================================================


app.get("/", (req, res, next) => {

    usuario.find({}, 'nombres Apellidos email img role')
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Usuarios',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    Usuarios: usuarios
                });

            });
});

// ========================================================
//  CREAR LOS USUARIOS
// ========================================================

app.post('/', (req, res) => {

    var body = req.body;

    var Usuario = new usuario({
        nombres: body.nombres,
        apellidos: body.apellidos,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    Usuario.save((err, usuarioSave) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al guardar Usuarios',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioSave
        });
    });



});


module.exports = app;