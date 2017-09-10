var express = require('express');
var expressMongoDb = require('express-mongo-db');
var env = require('node-env-file');

env('.env');

var app = express();
app.use(expressMongoDb('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/people_detector'));

var port = process.env.PORT || 8080;

app.use('/', require('./routes'));

app.listen(port);
console.log('Go to this port ' + port);
