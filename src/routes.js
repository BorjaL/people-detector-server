var express = require('express');
var prepareInfo = require('./prepare_info');
var weatherInfo = require('./weather');
var KeenTracking = require('keen-tracking');
var router = express.Router();

var client = new KeenTracking({
  projectId: process.env.KEEN_PROJECT_ID,
  writeKey: process.env.KEEN_WRITE_KEY
});

router.get('/count', function(req, res) {
  console.log('Save & sound');

  weatherInfo(function(weather_info){
      var date =  new Date();
      req.db.collection('detections').insertOne(prepareInfo(date, weather_info));
      client.recordEvent('person_detected', prepareInfo(date, weather_info));
  })

  res.send();
});

module.exports = router
