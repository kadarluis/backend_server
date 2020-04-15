var express = require('express');
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middleware/autentication');

var app = express();

//IMPORT SCHEMA
var instalaciones = require('../models/instalaciones');


// ========================================================
//  OBTENER TODOS
// ========================================================

app.get("/", (req, res) => {

    instalaciones.find({}, (err, inst) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando instalaciones',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            instalaciones: inst
        });
    });
});
// ========================================================
//  CREAR 
// ========================================================

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var instalacion = new instalaciones({
        ORDEN: body.ORDEN,
        ESTADO: "Pendiente",
        NOMBRE_DEL_PROYECTO: body.NOMBRE_DEL_PROYECTO,
        FECHA_DE_SOLICITUD: body.FECHA_DE_SOLICITUD,
        PRIORIDAD: body.PRIORIDAD,
        LOCALIDAD: body.LOCALIDAD,
        CLIENTE: body.CLIENTE,
        DIRECCIÓN: body.DIRECCIÓN,
        CONTACTO_CLIENTE: body.CONTACTO_CLIENTE,
        TELÉFONO: body.TELÉFONO,
        DISEÑADOR: body.DISEÑADOR,
        DESCRIPCIÓN_ACTIVIDAD: body.DESCRIPCIÓN_ACTIVIDAD
    });

    instalacion.save((err, instalacionesSave) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al guardar registro de instalación',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            instalacionGuardado: instalacionesSave,
            usuarioToken: req.usuario
        });

    });
});





//    // ========================================================
//    //  ACTUALIZAR LOS USUARIOS
//    // ========================================================

//    app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

//        var id = req.params.id;
//        var body = req.body;

//        // Verifico si existe usuario con el id
//        usuario.findById(id, (err, usuarioID) => {
//            if (err) {
//                return res.status(500).json({
//                    ok: false,
//                    mensaje: 'Error al buscar usuario',
//                    errors: err
//                });
//            }

//            // Verifico si el usuario esta vacio
//            if (!usuarioID) {
//                return res.status(400).json({
//                    ok: false,
//                    mensaje: 'El usuario con el id: ' + id + ', no existe',
//                    errors: { message: 'El usuario con el id: ' + id + ', no existe' }
//                });
//            }

//            // Ya encontrado el usuario lo modifico
//            usuarioID.nombres = body.nombres;
//            usuarioID.apellidos = body.apellidos;
//            usuarioID.email = body.email;
//            usuarioID.role = body.role;

//            usuarioID.save((err, usuarioSave) => {
//                if (err) {
//                    return res.status(400).json({
//                        ok: false,
//                        mensaje: 'Error al actualizar Usuarios',
//                        errors: err
//                    });
//                }

//                usuarioSave.password = ':P';

//                res.status(200).json({
//                    ok: true,
//                    usuarioActualizado: usuarioSave,
//                    usuarioToken: req.usuario
//                });
//            });
//        });
//    });

//    // ========================================================
//    //  BORRAR USUARIOS
//    // ========================================================

//    app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

//        var id = req.params.id

//        // Busco el usuario por su id

//        usuario.findByIdAndDelete(id, (err, usuarioDelete) => {

//            if (err) {
//                return res.status(500).json({
//                    ok: false,
//                    mensaje: 'Error al borrar usuario',
//                    errors: err
//                });
//            }

//            // Verifico si el usuario esta vacio
//            if (!usuarioDelete) {
//                return res.status(400).json({
//                    ok: false,
//                    mensaje: 'El usuario con el id: ' + id + ', no existe',
//                    errors: { message: 'El usuario con el id: ' + id + ', no existe' }
//                });
//            }

//            res.status(200).json({
//                ok: true,
//                usuarioBorrado: usuarioDelete,
//                usuarioToken: req.usuario
//            });

//        });



//    }); 


//metodo

module.exports = app;