var prepareInfo = function(date, weather_raw){
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

module.exports = prepareInfo
