var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//IMPORTS ROUTES
appRoutes = require('./routes/app');
userRoutes = require('./routes/user');
loginRoutes = require('./routes/login');


// INITIALIZA
var app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//CONECTION TO DB
mongoose.connect('mongodb://localhost:27017/eiaDB', (err, res) => {
    if (err) throw err;
    console.log('DB: \x1b[32m%s\x1b[0m', 'ONLINE');
});

//ROUTES
app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


//LISTENING
app.listen(3000, () => {
    console.log('SERVER ON PORT 3000: \x1b[32m%s\x1b[0m', 'ONLINE');
});