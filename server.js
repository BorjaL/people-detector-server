var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
  console.log('Save & sound');
  res.send();
});


app.use('/', router);
app.listen(port);
console.log('Go to this port ' + port);
