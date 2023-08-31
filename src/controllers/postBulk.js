const Countries = require("../models/countries.js");

const postCountries = async (attributes) => {
    console.log(attributes);
    // const countriesBulk = new Countries(attributes);
    // return await countriesBulk.create();
    return await Countries.create(attributes);
};

module.exports = postCountries;


/*------------------------------------------------------------------------------------------------------------*/

// //const Countries = require("../models/countries.js");
// const Hotel = require("../models/hotelModel.js");
// const hotels = require('../../hotels.json')
// const { v4: uuidv4 } = require('uuid');

// const postCountries = async (attributes) => {
//     console.log(attributes);
//     console.log(attributes.id);
//     // const countriesBulk = new Countries(attributes);
//     // return await countriesBulk.create();
//     // const hotel = await Hotel.findByIdAndUpdate(attributes.id);

//     hotels.forEach(hotel => {
//         const hotelNew = {
//             ...hotel,
//             image: [{
//                 id: uuidv4(),
//                 src: hotel.image,
//                 typeImage: "image/jpeg",
//                 size: 128419
//             }]
//         }
//         const hotelsBulk = new Hotel(hotelNew);
//         hotelsBulk.save();
//     });
//     return 'ok'
    
    
// };
/*------------------------------------------------------------------------------------------------------------*/

// module.exports = postCountries;

// const axios = require("axios");
// const States = require("../models/states.js");
// const Countries = require("../models/countries.js");

// const postCountries = async (attributes) => {
//     const name = attributes.country_name

//     const { data } = await axios({
//         method: 'get',
//         url: `https://www.universal-tutorial.com/api/states/${name}`,
//         headers: {
//             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJmaW5kaG90ZWxmaEBnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiI1eUV3eXRHYWtKd0ZGQWRlenM2UHN4UjNwTG12Q3dlbi1xSnBhSG51cVdZT00tcEZBR1F5QWtkWEFNWXQxWXFJbHZFIn0sImV4cCI6MTY5MzUxMzg0MX0.MCjzdlXN4fP8TKcl5crpP3ImDdue2yJLuJpcDaSCLXk',
//             Accept: 'application/json'
//         }
//     })

//     const { _id } = await Countries.findOne({ country_name: name });
//     const devolver = new States({ Countries_id: _id, states: data })
//     return await devolver.save();
//     // return devolver

// };

// module.exports = postCountries;