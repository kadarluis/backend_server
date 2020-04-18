var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var DBCONECT = require('./config/config').DBCONECTION;

//IMPORTS ROUTES
appRoutes = require('./routes/app');
userRoutes = require('./routes/user');
loginRoutes = require('./routes/login');
instalacionesRoutes = require('./routes/instalacion');
uploadRoutes = require('./routes/upload');


// INITIALIZA
var app = express();

// express-fileupload
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//CONECTION TO DB
mongoose.connect(DBCONECT, (err, res) => {
    if (err) throw err;
    console.log('DB: \x1b[32m%s\x1b[0m', 'ONLINE');
});

//ROUTES
app.use('/user', userRoutes);
app.use('/instalaciones', instalacionesRoutes);
app.use('/login', loginRoutes);
app.use('/upload', uploadRoutes);

app.use('/', appRoutes);


//LISTENING
app.listen(3000, () => {
    console.log('SERVER ON PORT 3000: \x1b[32m%s\x1b[0m', 'ONLINE');
});