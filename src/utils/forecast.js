const request = require('postman-request')
const forecast = (lat, long, callback) => {
    if (lat && long) {
        const url = 'http://api.weatherstack.com/current?access_key=15b4f70d850785a4324d63658e285c00&query=' +lat+','+long
        request({url : url, json : true}, (error, {body}) => {
            if(error) {
                callback(true, error)
            } else {
                callback(false, body)
            }
        })
    } else {
        callback(true, 'Invalid data')
    }
}
module.exports = forecast