const Countries = require('../models/countries')

const countriesList = async () => {
    const countries = Countries.find()
    return countries
};

module.exports = countriesList;