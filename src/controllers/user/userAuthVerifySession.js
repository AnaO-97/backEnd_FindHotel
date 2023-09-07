const mongoose = require('mongoose');

const userAuthVerifySession = async (req, res) => {
    try {
        const sessionID = req.headers.authorization;

        if (!sessionID) {
            return res.status(401).json({ message: 'Missing authorization token' });
        }

        const ID = handlerDecodeTokenIDSession(sessionID);

        const db = mongoose.connection;
        const Session = db.collection('sessions');
        const { session: { auth } } = await Session.findOne({ _id: ID });
        if (auth) {
            res.status(200).json(auth)
        }
        else {
            res.status(404).json({ message: 'The session has expired, please log in again.' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = userAuthVerifySession