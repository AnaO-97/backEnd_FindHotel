const { config } = require('../../config');
const mongoose = require('mongoose');

const handlerDateFinishSession = async (id_session) => {

    try {
        const db = mongoose.connection;
        const Session = db.collection('sessions');
        const { expires } = await Session.findOne({ _id: id_session });

        return expires
    } catch (error) {
        console.error(error)
    }
}

module.exports = handlerDateFinishSession

