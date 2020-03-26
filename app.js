// REQUIRES
var express = require('express');
var mongoose = require('mongoose');

// INITIALIZA
var app = express();

//CONECT TO DB
mongoose.connection.openUri('mongodb://localhost:27017/eiaDB', (err, res) => {
    if (err) throw err;
    console.log('DB: \x1b[32m%s\x1b[0m', 'ONLINE');
});


//ROUTER
app.get("/", (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'

    });
});

//LISTENING
app.listen(3000, () => {
    console.log('SERVER ON PORT 3000: \x1b[32m%s\x1b[0m', 'ONLINE');
});