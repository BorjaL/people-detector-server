var http = require('http');

var weather_options = {
  hostname: 'api.openweathermap.org',
  path: '/data/2.5/weather?lat=43.375489&lon=-8.3973306&units=metric&APPID=' + process.env.OPENWEATHERMAP_APPID
}

var weatherInfo = function(callback){
  http.get(weather_options, function(res){
    var body = '';

    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){
      var weather_info = {}
      try {
        weather_info = JSON.parse(body);
      }
      catch(err){
        console.error(err.message);
      }
      callback(weather_info);
    });
  }).on('error', function(err) {
    console.error(err.message);
  });
}

module.exports = weatherInfo
