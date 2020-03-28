var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var ROL = {
    values: ['COORDINADOR', 'TECNICO DE FIBRA'],
    message: '{VALUE} no es un rol valido'
}


var userSchema = new Schema({
    nombres: { type: String, required: [true, "El nombre es requerido"] },
    apellidos: { type: String, required: [true, "El apellido es requerido"] },
    email: { type: String, unique: true, required: [true, "El correo es requerido"] },
    password: { type: String, required: [true, "La contraseña es requerido"] },
    img: { type: String },
    role: { type: String, required: true, enum: ROL, default: 'ADMIN' }

});

userSchema.plugin(uniqueValidator, { message: 'Error, {PATH} debe ser unico.' });

module.exports = mongoose.model("users", userSchema);