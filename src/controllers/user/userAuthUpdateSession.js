const { handlerDecodeTokenIDSession, handlerTokenIdSession } = require("../../handlers/user");
const { config } = require('../../config');
const mongoose = require('mongoose');

const userAuthUpdateSession = async (req, res) => {
    try {
        const sessionID = req.headers.authorization;

        if (!sessionID) {
            return res.status(401).json({ message: 'Missing authorization token' });
        }

        const ID = handlerDecodeTokenIDSession(sessionID);
        const db = mongoose.connection;
        const Session = db.collection('sessions');
        const userSession = await Session.findOne({ _id: ID });
        if (userSession) {
            const currentDate = new Date(userSession.expires);
            const dateExpires = new Date(currentDate.getTime() + config.SESSION_TIME * 60 * 1000);

            const updateDateExpires = {
                $set: {
                    expires: dateExpires,
                    'session.cookie.expires': dateExpires
                }
            };

            const result = await Session.updateOne({ _id: ID }, updateDateExpires);
            if (result) {
                res.status(200).json({
                    _id: handlerTokenIdSession(sessionID),
                    expires: dateExpires,
                    ...userSession.session.auth
                })
            }
            else {
                await Session.deleteOne({ _id: ID })
                res.status(400).json({ error: 'Could not update session record, please login again.' });
            }
        } else {
            res.status(400).json({ error: 'The session was not found' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = userAuthUpdateSession;
