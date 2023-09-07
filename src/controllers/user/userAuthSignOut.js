const { config } = require('../../config')
const { handlerDecodeTokenIDSession } = require('../../handlers/user')
const mongoose = require('mongoose');

const userAuthSignOut = async (req, res) => {
    try {
        const sessionID = req.headers.authorization;

        if (!sessionID) {
            return res.status(401).json({ message: 'Missing authorization token' });
        }

        const ID = handlerDecodeTokenIDSession(sessionID);
        const db = mongoose.connection;
        const Session = db.collection('sessions');
        const { deletedCount } = await Session.deleteOne({ _id: ID })
        if (deletedCount) {
            return res.status(200).json({ message: 'Session successfully closed' })
        }
        return res.status(400).json({ message: 'There is no active session with the record record' })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = userAuthSignOut