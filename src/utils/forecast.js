const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9dafdb6500871cdb5479c2cff8ecafbd/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to forecast service', undefined)
        } else if (body.error) {
            callback('Unable to find weather information. Try another search', undefined)
        } else {
            callback(undefined, 'The current weather is ' + body.currently.summary.toLowerCase() + '. The temperature is ' + body.currently.temperature + '°C, precipitation probability is ' + (body.currently.precipProbability * 100) + '% and humidity percentage is ' + (body.currently.humidity * 100) + '%')            
        }
    })
}

module.exports = forecast