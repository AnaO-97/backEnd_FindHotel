const mongoose = require('mongoose');

const userAuthVerifySession = async (req, res) => {
    const id = req.body.id
    try {
        const sessionID = handlerDecodeTokenIDSession(id);

        const db = mongoose.connection;
        const Session = db.collection('sessions');
        const userSession = await Session.findOne({ _id: sessionID });
        if (userSession) {
            res.status(200).json(true)
        }
        else {
            res.status(404).json(false)
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = userAuthVerifySession