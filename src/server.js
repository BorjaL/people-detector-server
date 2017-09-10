var express = require('express');
var expressMongoDb = require('express-mongo-db');
var env = require('node-env-file');
var passport = require('passport');
var LocalAPIKeyStrategy = require('passport-localapikey').Strategy;

env('.env');

var app = express();
app.use(expressMongoDb('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/people_detector'));
app.use(passport.initialize());
app.use('/', require('./routes'));

passport.use(new LocalAPIKeyStrategy(
  function(apikey, done) {
    return done(null, apikey == process.env.API_KEY);
  }
));

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Go to this port ' + port);
