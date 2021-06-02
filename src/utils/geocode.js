const request = require('postman-request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3VtYXIwODIzMCIsImEiOiJja3A5eHg5amwwbDNyMnFtc2w1dG1xeDFrIn0.s2vU2AjOBsaXCQBOMA-S9g'
    request({url : url, json : true}, (error, {body}) => {
        if (error) {
            callback(true, error)
        } else if (body.features.length == 0) {
            callback(true, 'Unable to fetch data')
        } else {
            callback(false, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}
module.exports = geocode