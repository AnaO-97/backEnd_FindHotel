const States = require('../models/states')
const Countries = require('../models/countries')

const stateList = async (country) => {
    const countryRegex = new RegExp(country, 'i');
    const country_id = await Countries.find({ country_name: countryRegex }, '_id')
    const states_list = await States.find({ Countries_id: country_id }, 'states')
    return states_list
}

module.exports = stateList;