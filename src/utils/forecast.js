const request = require('request')



const forecast = (latitude,longitude,callback) => {
const url = 'https://api.darksky.net/forecast/1eb51890d935c271467729fca48be44a/' + latitude + ','+ longitude


request({ url, json:true},(error, {body}) => {  // json: true is directly through a js data no need to convert JSON to js
    //    console.log(response.body.currently)
    
    if(error){
      callback("unable to connect weather service!!", undefined)
    }else if(body.error) {
      callback('Unable to find location', undefined)
    }else { 
        callback(undefined,body.daily.data[0].summary+'It is currently'+' '+body.currently.temperature+' '+'is out' + 'There is a'+' '+body.currently.precipProbability+' '+'chance of rain')
        
    }
    })
      }
       module.exports = forecast