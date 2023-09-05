const { config } = require('../config');
const { MongoClient } = require('mongodb');

const validateAuthUserSession = (role = 'user') => async (req, res, next) => {
    const cookies = req.cookies
    console.log(cookies)
    if (cookies) {
        const sessionID = req.sessionID
        const client = new MongoClient(config.URL_MONGO_FINDHOTEL, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            await client.connect();

            const db = client.db();
            const Session = db.collection('sessions');
            const { session } = await Session.findOne({ auth });
            console.log(session);
            if (session) {
                if (role === session.auth.role) {
                    req.session = session.auth
                    // next()
                } else {
                    res.redirect('/')
                }
            } else {
                res.status(404).json({ message: 'Session not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            await client.close();
        }
    } else {
        res.locals.userAuth = null;
    }
    next();
}

module.exports = validateAuthUserSession

