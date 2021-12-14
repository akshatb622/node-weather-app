const request = require('request');

const forecast = (longitude,latitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=dd2416121b79154f411ffde8fc94b5d8&query='+latitude+','+longitude;

    request({url,json : true},(error,{body})=>{
        if(error){
            callback("Unable to connect to weather service",undefined);
        }
        else if(body.error){
            callback("Unable to find location",undefined);
        }
        else{
            
            forecastString = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out.There is a ' + body.current.precip + ' % chance of rain';
            weatherIcon = body.current.weather_icons[0];
            data = {
                forecastString,
                weatherIcon    
            }
            callback(undefined,data);
        }
    });
  
};

module.exports = forecast;