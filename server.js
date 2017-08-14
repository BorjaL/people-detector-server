var express = require('express');
var expressMongoDb = require('express-mongo-db');
var app = express();
app.use(expressMongoDb('mongodb://localhost/people_detector'));

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
  console.log('Save & sound');
  req.db.collection('detections').insertOne({'time' : new Date()})
  res.send();
});


app.use('/', router);
app.listen(port);
console.log('Go to this port ' + port);
