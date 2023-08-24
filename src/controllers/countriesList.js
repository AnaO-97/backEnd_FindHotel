const axios = require('axios');
require('dotenv').config();
const { ENDPOINT_COUNTRIES, AUTHORIZATION, ACCEPT } = process.env;

const countriesList = async () => {
    return await axios({
        method: 'get',
        url: ENDPOINT_COUNTRIES,
        headers: {
            'Authorization': AUTHORIZATION,
            'Accept': ACCEPT
        }
    })
        .then(({ data }) => {
            return data
        })
        .catch((error) => {
            throw Error(error)
        });
};

module.exports = countriesList;