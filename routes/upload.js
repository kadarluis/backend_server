var express = require('express');
var fileUpload = require('express-fileupload');

var app = express();


app.post("/imagen", (req, res) => {


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

        res.send('File uploaded!');
    });


    res.status(200).json({
        ok: true,
        mensaje: 'File uploaded.',
        Nombre: archivo.name,
        extension: extension,
        ruta: archivo.tempFilePath

    });
});



module.exports = app;