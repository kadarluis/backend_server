var express = require('express');
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middleware/autentication');

var app = express();

//IMPORT SCHEMA USUARIOS
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

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

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
            usuarioGuardado: usuarioSave,
            usuarioToken: req.usuario
        });

    });
});

// ========================================================
//  ACTUALIZAR LOS USUARIOS
// ========================================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    // Verifico si existe usuario con el id
    usuario.findById(id, (err, usuarioID) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        // Verifico si el usuario esta vacio
        if (!usuarioID) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id: ' + id + ', no existe',
                errors: { message: 'El usuario con el id: ' + id + ', no existe' }
            });
        }

        // Ya encontrado el usuario lo modifico
        usuarioID.nombres = body.nombres;
        usuarioID.apellidos = body.apellidos;
        usuarioID.email = body.email;
        usuarioID.role = body.role;

        usuarioID.save((err, usuarioSave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar Usuarios',
                    errors: err
                });
            }

            usuarioSave.password = ':P';

            res.status(200).json({
                ok: true,
                usuarioActualizado: usuarioSave,
                usuarioToken: req.usuario
            });
        });
    });
});

// ========================================================
//  BORRAR USUARIOS
// ========================================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id

    // Busco el usuario por su id

    usuario.findByIdAndDelete(id, (err, usuarioDelete) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }

        // Verifico si el usuario esta vacio
        if (!usuarioDelete) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id: ' + id + ', no existe',
                errors: { message: 'El usuario con el id: ' + id + ', no existe' }
            });
        }

        res.status(200).json({
            ok: true,
            usuarioBorrado: usuarioDelete,
            usuarioToken: req.usuario
        });

    });



});

module.exports = app;