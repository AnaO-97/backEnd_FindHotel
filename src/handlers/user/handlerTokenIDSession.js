const jwt = require('jsonwebtoken');
const { config } = require('../../config')

const handlerTokenIdSession = (sessionID) => {
    try {
        const tokenID = jwt.sign({ sessionID },
            config.JWT_ID_SESSION,
            { expiresIn: '30m' }); // '30m' para 30 minutos
        return tokenID
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = handlerTokenIdSession;
