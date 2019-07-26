const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9dafdb6500871cdb5479c2cff8ecafbd/' + latitude + ',' + longitude + '?units=si&lang=es'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('No fue posible conectar con el servicio del clima', undefined)
        } else if (body.error) {
            callback('No fue posible encontrar informacion del tiempo. Intenta otra busqueda', undefined)
        } else {
            callback(undefined, 'El tiempo es ' + body.currently.summary + '. La temperatura es de ' + body.currently.temperature + '. Y la posibilidad de precipitacion es de ' + body.currently.precipProbability + '%')            
        }
    })
}

module.exports = forecast