const generateTokenVerifyMail = require('./generateTokenVerifyMail')
const sendVerifyMail = require('./sendVerifyEmail')
const { handlerError, handlerSuccess } = require('./messages')

module.exports = {
    handlerError,
    handlerSuccess,
    generateTokenVerifyMail,
    sendVerifyMail
};