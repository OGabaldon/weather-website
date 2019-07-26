const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Clima',
        name: 'Osvaldo G'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Acerca de',
        name: 'Osvaldo G'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ayuda',
        name: 'Osvaldo G',
        helpText: 'Pagina de ayuda'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Debes proveer una ubicacion'
        }) 
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error }) 
        }
        
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error: error }) 
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Debes proveer una busqueda'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Osvaldo G',
        errorMessage: 'Articulo de ayuda no encontrado'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Osvaldo G',
        errorMessage: 'Pagina no encontrada'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})