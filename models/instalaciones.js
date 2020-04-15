var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var userSchema = new Schema({
    ORDEN: {
        type: Number,
        unique: true,
        required: [true, "Número de órden requerido"]
    },
    ESTADO: {
        type: String
    },
    NOMBRE_DEL_PROYECTO: {
        type: String,
        required: [true, "El NOMBRE DEL PROYECTO es requerido"]
    },
    FECHA_DE_SOLICITUD: {
        type: Date,
        required: [true, "La FECHA DE SOLICITUD es requerido"]
    },
    PRIORIDAD: {
        type: Number,
        min: 0,
        max: 3
    },
    ANS: {
        type: Date
    },
    FECHA_DE_INSTALACION: {
        type: Date
    },
    TECNICO: {
        type: String
    },
    ZONA: {
        type: String
    },
    LOCALIDAD: {
        type: String,
        required: [true, "El apellido es requerido"]
    },
    CLIENTE: {
        type: String,
        required: [true, "El nombre del CLIENTE es requerido"]
    },
    CONTACTO_CLIENTE: {
        type: String,
        required: [true, "El CONTACTO_CLIENTE del cliente es requerido"]
    },
    DIRECCIÓN: {
        type: String,
        required: [true, "la DIRECCIÓN del cliente es requerido"]
    },
    TELÉFONO: {
        type: String,
        required: [true, "El TELÉFONO del cliente es requerido"]
    },
    DISEÑADOR: {
        type: String,
        required: [true, "El DISEÑADOR es requerido"]
    },
    DESCRIPCIÓN_ACTIVIDAD: {
        type: String,
        required: [true, "la DESCRIPCIÓN_ACTIVIDAD es requerido"]
    },
    SEGUIMIENTO_EIA: {
        type: String
    },


});

userSchema.plugin(uniqueValidator, { message: 'Error, {PATH} debe ser unico.' });

module.exports = mongoose.model("instalaciones", userSchema);