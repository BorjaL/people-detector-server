var express = require('express');
var expressMongoDb = require('express-mongo-db');
var app = express();
app.use(expressMongoDb('mongodb://localhost/people_detector'));

var port = process.env.PORT || 8080;

var router = express.Router();

var dateInfo = function(now){
  var info = {'time' : now,
   'dayMonth': now.getDate(),
   'dayWeek': now.getDay(),
   'hour': now.getHours(),
   'minute': now.getMinutes(),
   'month': now.getMonth(),
   'year': now.getFullYear()
  }
  return info;
}

router.get('/', function(req, res) {
  console.log('Save & sound');
  var now =  new Date();
  req.db.collection('detections').insertOne(dateInfo(now))
  res.send();
});


app.use('/', router);
app.listen(port);
console.log('Go to this port ' + port);
