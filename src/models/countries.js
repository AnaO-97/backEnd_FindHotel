const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countriesSchema = new Schema({
    country_name: {
        type: String,
        required: true,
        unique: true
    },
    country_short_name: {
        type: String,
        required: true,
        unique: true
    },
    country_phone_code: {
        type: Number,
        required: true,
    }
});

const Countries = mongoose.model('countries', countriesSchema);
module.exports = Countries;