const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statesSchema = new Schema({
    Countries_id: {
        type: Schema.Types.ObjectId,
        ref: 'Countries',
        require: true
    },
    states: {
        type: [
            {
                state_name: { type: String }
            }
        ]
    }
});

const States = mongoose.model('states', statesSchema);
module.exports = States;