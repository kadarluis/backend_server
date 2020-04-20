var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');


var users = require('../models/user');

var app = express();


app.post("/imagen/:id", (req, res) => {

    var id = req.params.id;


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No files were uploaded.'
        });
    }

    var archivo = req.files.imagen;
    var nombreArchivo = req.files.imagen.name;
    var extension = nombreArchivo.split('.').pop();

    //VALIDAR SI LA EXTENSION ES JPG
    if (extension != 'jpg') {
        return res.status(400).json({
            ok: false,
            mensaje: 'La extension con el formato .' + extension + ', no es válido. Por favor ingrese un archivo con extension .jpg'
        });

    }

    //NOMBRE AL ARCHIVO
    var nuevoNombre = `${ new Date().getMilliseconds() }.${ extension }`;

    // MOVER EL ARCHIVO
    var path = `./uploads/img/${ nuevoNombre }`;



    archivo.mv(`${ path }`, function(err) {
        if (err)
            return res.status(500).send(err);

        subirBD(users, id, nuevoNombre, res);
    });

});



//Funcion para asignar imagen a users
function subirBD(users, id, nuevoNombre, res) {

    users.findById(id, (err, users) => {


        pathViejo = './uploads/img/' + users.img;

        //busca si ya hay una imagen en el user para eliminarlo.
        if (fs.existsSync(pathViejo)) {
            fs.unlink(pathViejo, function(err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
            });
        };

        users.img = nuevoNombre;


        users.save((err, usersUpload) => {

            return res.status(200).json({
                ok: true,
                mensaje: 'File uploaded.',
                pathViejo: pathViejo,
                usuario: usersUpload

            });
        });
    });

}

module.exports = app;