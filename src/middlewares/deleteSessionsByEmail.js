const { config } = require('../config');
const mongoose = require('mongoose');

const deleteSessionsByEmail = async (req, res, next) => {
    try {
        const user = req.body;
        const db = mongoose.connection;
        const Session = db.collection('sessions');
        await Session.deleteMany({ 'session.auth.email': user.email })
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteSessionsByEmail