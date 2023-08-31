/*-----------Bulk Changes Deal Information--------------------------------------------------------------------------------------------*/
const User=require('../models/userModel')
const Deal = require("../models/dealModel");

const postCountries = async (attributes) => {
const deal=await Deal.find({},'_id')
const users=await User.find({role:'User'},'_id')
let i=0
let j=0
try {
while(i<deal.length){
    const id=deal[i].id
    const idtwo=deal[i+20].id
    const update={User_id:users[j]?._id}
// console.log('deal',deal[i].id)
// console.log('users',users[j])
const impr=await Deal.findByIdAndUpdate(id,update,{new:true})
const imprtwo=await Deal.findByIdAndUpdate(idtwo,update,{new:true})
i++
j++
}
return 'ok'
}catch(error){
    console.log(error)
}

};


module.exports = postCountries;

/*-----------Bulk Countries Information--------------------------------------------------------------------------------------------*/

// const HotelRoom = require("../models/hotelRoomModel");

// const postCountries = async (attributes) => {
//     const hotelRooms=HotelRoom.find({},'User_id Hotel_id RoomType_id')
//     return hotelRooms
// };

// module.exports = postCountries;


/*-----------Bulk Hotel Rooms Information-------------------------------------------------------------------------------------------------*/

// const Hotel = require("../models/hotelModel");
// const RoomType = require("../models/roomTypeModel");
// const HotelRoom=require('../models/hotelRoomModel')
// const postCountries = async (attributes) => {

//     const hotels=await Hotel.find({},'_id User_id');
//     hotels.forEach(async (hotel)=>{
//         const rooms=await RoomType.find({User_id:hotel.User_id},'_id');
//         rooms.forEach(async (room)=>{
//             const final= new HotelRoom({
//                 Hotel_id:hotel._id,
//                 User_id:hotel.User_id,
//                 RoomType_id:room._id
//             })
//             await final.save()
//         })
//     })

//    return 'ok'
// };

// module.exports = postCountries;



/*-----------Bulk Countries Information--------------------------------------------------------------------------------------------*/

// const Countries = require("../models/countries.js");

// const postCountries = async (attributes) => {
//     console.log(attributes);
//     // const countriesBulk = new Countries(attributes);
//     // return await countriesBulk.create();
//     return await Countries.create(attributes);
// };

// module.exports = postCountries;


/*-------Bulk image Hotel (array)-----------------------------------------------------------------------------------------------------*/


// const Hotel = require("../models/hotelModel.js");
// const hotels = require('../../hotels.json')
// const { v4: uuidv4 } = require('uuid');

// const postCountries = async (attributes) => {
//     console.log(attributes);
//     console.log(attributes.id);

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


/*-----------Bulk States Info-------------------------------------------------------------------------------------------------*/

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

// };

// module.exports = postCountries;