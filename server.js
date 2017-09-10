var express = require('express');
var http = require('http');
var expressMongoDb = require('express-mongo-db');
var KeenTracking = require('keen-tracking');
var app = express();
app.use(expressMongoDb('mongodb://mongo:27017/people_detector'));

var port = process.env.PORT || 8080;

var router = express.Router();

var saveInfo = function(date, weather_raw){
  var date_info = {
   'date' : date,
   'dayMonth': date.getDate(),
   'dayWeek': date.getDay(),
   'hour': date.getHours(),
   'minute': date.getMinutes(),
   'month': date.getMonth(),
   'year': date.getFullYear()
  };
  var weather_info = {};
  try {
    weather_info = {
      'weather_condition': weather_raw.weather[0].main,
      'weather_description': weather_raw.weather[0].description,
      'temperature': weather_raw.main.temp,
      'pressure': weather_raw.main.pressure,
      'humidity': weather_raw.main.humidity,
      'temp_min': weather_raw.main.temp_min,
      'temp_max': weather_raw.main.temp_max,
      'visibility': weather_raw.visibility,
      'wind': weather_raw.wind,
      'clouds': weather_raw.clouds,
      'rain': weather_raw.rain,
      'snow': weather_raw.snow
    }
  }
  catch(err){
    console.error(err)
  }
  return {'date_info': date_info, 'weather_info': weather_info};
}

var client = new KeenTracking({
  projectId: '59a99221c9e77c0001bc2342',
  writeKey: '7A6FD22AC42DC3DE12AA58214C105DA0E23E12629D1260C2D0BED8D4D642D5147343FEB725CBC026FE72DB5893E12B3D728D02B8E7224E197B938E5F7A93A9296285C71D6572E0A9CBC80FABC442D7C3D1FAF78D5C92D3DC27866FA841CFB1F1'
});

var weather_options = {
  hostname: 'api.openweathermap.org',
  path: '/data/2.5/weather?lat=43.375489&lon=-8.3973306&units=metric&APPID=ffe37f9624875ae525fb6bf455e54695'
}

router.get('/', function(req, res) {
  console.log('Save & sound');

  http.get(weather_options, function(res){
    var body = '';

    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){
      var date =  new Date();
      var weather_info = {}
      try {
        weather_info = JSON.parse(body);
      }
      catch(err){
        console.error(err.message);
      }
      req.db.collection('detections').insertOne(saveInfo(date, weather_info));
      client.recordEvent('person_detected', saveInfo(date, weather_info));
    });
  }).on('error', function(err) {
    console.error(err.message);
  });

  res.send();
});


app.use('/', router);
app.listen(port);
console.log('Go to this port ' + port);
