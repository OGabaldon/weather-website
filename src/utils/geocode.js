const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib3N2YWxkb2dhYmFsZG9uIiwiYSI6ImNqeTMyMmNlZjBwb2gzbm9pcHBxMzc0bWEifQ.y6lo8IJHO4LSaIroR93OdA&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('No fue posible conectar con el servicio de localizacion', undefined)
        } else if (body.features.length === 0) {
            callback('No fue posible encontrar la ubicacion. Intenta otra busqueda', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })            
        }
    })
}

module.exports = geocode