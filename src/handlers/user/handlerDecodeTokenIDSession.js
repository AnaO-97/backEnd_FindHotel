const jwt = require('jsonwebtoken');
const { config } = require('../../config')

const handlerDecodeTokenIDSession = (tokenSessionID) => {
    try {
        const { sessionID } = jwt.verify(tokenSessionID, config.JWT_ID_SESSION);
        return sessionID
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = handlerDecodeTokenIDSession