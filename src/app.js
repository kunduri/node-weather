const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const pubDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pubDir))

app.get('', (req, res) => {
    res.render('index',{
        title : 'Weather Application',
        name : 'Nagendra'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Page',
        name : 'Nagendra'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help Page',
        name : 'Nagendra'
    })
})
app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error : 'No Address available'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error : 'Error on ' + location})
        } else {
            forecast(latitude, longitude,(error, body) => {
                if(error) {
                    return res.send({error : 'Error on ' + location})
                } else {
                    return res.send({
                        result : body.current.weather_descriptions[0],
                        latitude : latitude,
                        longitude : longitude
                    })
                }
            })
        }
    })

})
app.get('/help/*', (req, res) => {
    res.render('error', {
        title : 'Help Page not found',
        name : 'Nagendra'
    })
})
app.get('/about/*', (req, res) => {
    res.render('error', {
        title : 'About Page not found',
        name : 'Nagendra'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title : 'Page not found',
        name : 'Nagendra'
    })
})
app.listen(3000, () => {
    console.log('Server initiated')
})