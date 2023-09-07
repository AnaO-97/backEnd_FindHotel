const mongoose = require('mongoose');
const { handlerDecodeTokenIDSession } = require('../handlers/user');

const validateAuthUserSession = (allowedRoles) => async (req, res, next) => {
    try {
        const sessionID = req.headers.authorization;

        if (!sessionID) {
            return res.status(401).json({ message: 'Missing authorization token' });
        }

        const ID = handlerDecodeTokenIDSession(sessionID);

        const db = mongoose.connection;
        const Session = db.collection('sessions');
        const { session: { auth } } = await Session.findOne({ _id: ID });

        if (auth == null) {
            return res.status(401).json({ message: 'Session not found or not authorized' });
        }

        if (!allowedRoles.includes(auth.role)) {
            return res.status(403).json({ message: 'You do not have permission to access this route' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = validateAuthUserSession;
