const axios = require('axios')
require('dotenv').config();
const { ENDPOINT_STATES, AUTHORIZATION, ACCEPT } = process.env

const stateList = async (country) => {
    console.log(`${ENDPOINT_STATES}${country}`);
    return await axios({
        method: 'get',
        url: `${ENDPOINT_STATES}${country}`,
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
        })
}

module.exports = stateList;