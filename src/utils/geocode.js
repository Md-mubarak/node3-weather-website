 const request = require('request')

 const geocode = (address, callback) => {
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWRtdWJhcmFrIiwiYSI6ImNrNmJyY3gzaTExOWgza3BrOHl5ODMzbGgifQ.3Jr_4HVS2-gaFkCIdusxGQ&limit=1'
request({url, json:true}, (error,{ body }) => {
    if(error) {
        callback('unable to connect to location services!!', undefined)
    }else if(body.features.length === 0) {
        callback('unable to find location', undefined)
    } else {
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    }
})

   }

   module.exports = geocode