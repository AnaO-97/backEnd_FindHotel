const firebase = require('./firebaseConfig')
const mailTransport = require('./nodemailerConfig')
const swaggerSpec = require('./swaggerConfig')
const config = require('./config')

module.exports = {
    config,
    firebase,
    mailTransport,
    swaggerSpec
}