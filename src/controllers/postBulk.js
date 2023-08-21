const Countries = require("../models/countries.js");

const postCountries = async (attributes) => {
    console.log(attributes);
    // const countriesBulk = new Countries(attributes);
    // return await countriesBulk.create();
    return await Countries.create(attributes);
};

module.exports = postCountries;