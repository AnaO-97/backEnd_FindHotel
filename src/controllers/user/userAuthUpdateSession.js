const { handlerDecodeTokenIDSession } = require("../../handlers/user");
const { config } = require('../../config');
const mongoose = require('mongoose');

const userAuthUpdateSession = async (req, res) => {
    const user = req.body.user;
    try {
        const sessionID = handlerDecodeTokenIDSession(user._id);
        if (sessionID) {

            const db = mongoose.connection;
            const Session = db.collection('sessions');
            const userSession = await Session.findOne({ _id: sessionID });

            if (userSession) {
                const currentDate = new Date(userSession.expires);
                const dateExpires = new Date(currentDate.getTime() + config.SESSION_TIME * 60 * 1000);

                const updateDateExpires = {
                    $set: {
                        expires: dateExpires,
                        'session.cookie.expires': dateExpires
                    }
                };

                const sessionUpdated = await Session.updateOne({ _id: sessionID }, updateDateExpires);
                if (sessionUpdated) {
                    user.expires = dateExpires,
                        res.status(200).json(user)
                }
                else {
                    res.status(400).json({ error: 'Could not update session record' });
                }
            } else {
                res.status(400).json({ error: 'The session was not found' });
            }
        } else {
            res.status(400).json({ error: 'The sessionID is missing or invalid' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = userAuthUpdateSession;
