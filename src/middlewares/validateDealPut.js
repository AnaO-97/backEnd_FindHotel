const Deal = require("../models/dealModel");
const User = require("../models/userModel");
const Hotel= require("../models/hotelModel");
const RoomType = require("../models/roomTypeModel");
const mongoose = require("mongoose");

const validationsPerSchemaAttribute = async (put, dealId) => {
    const validations = {};
    // var fechaActual = new Date();
    // var horasActuales = fechaActual.getHours();
    // console.log(fechaActual);
    // fechaActual.setHours(horasActuales-7);
    // console.log(fechaActual);
    
    const deal = await (Deal.findById(dealId))

    if(deal === null){
        validations.Deal_id = "The deal was not found with the supplied ID, please check it"
        return (validations);
    }
    else {
        if(put.User_id){
            if (mongoose.Types.ObjectId.isValid(put.User_id)){
                const user = await User.findById(put.User_id);
                if (user === null)
                    validations.User_id = "User not found with provided ID"
            }
            else
                validations.User_id = "The provided User_id is not valid for mongoose ID's"
        }
        if(put.Hotel_id){
            if (mongoose.Types.ObjectId.isValid(put.Hotel_id)){
                const hotel = await Hotel.findById(put.Hotel_id);
                if (hotel === null)
                    validations.Hotel_id = "Hotel not found with provided ID"
            }
            else
                validations.Hotel_id = "The provided Hotel_id is not valid for mongoose ID's"
        }
        if(put.RoomType_id){
            if (mongoose.Types.ObjectId.isValid(put.RoomType_id)){
                const roomType = await RoomType.findById(put.RoomType_id);
                if (roomType === null)
                validations.RoomType_id = "Room not found with provided ID"
            }
            else
                validations.RoomType_id = "The provided RoomType_id is not valid for mongoose ID's"
        }
        if(put.status){
            const status = ["booking", "purchase", "cancelled", "active", "finished"];        
            if (!status.includes(put.status))
                validations.status = `The status --> ${put.status} <-- does not match the possibilities for this property`
        }   
        if(put.checkIn){
            const { checkOut } = deal;
            const milisegundos = Date.parse(put.checkIn);
            const checkInAfter = new Date(milisegundos);
            if(checkInAfter >= checkOut){
                validations.checkIn = "The checkIn's date must be before checkOut";
            }
        }
        if(put.checkOut){
            const { checkIn } = deal;
            const milisegundos = Date.parse(put.checkIn);
            const checkOutAfter = new Date(milisegundos);
            if(checkOutAfter <= checkIn){
                validations.checkOut = "The checkOut's date must be after checkIn";        
            }
        }
    }
    return validations;
}

const validateDealPut = async (req, res, next) =>{
    const put = req.body;
    const { dealId } = req.params;
        
    if(Object.entries(put).length){
        const validations = await validationsPerSchemaAttribute(put,dealId);
    
        if(Object.entries(validations).length){
            res.status(404).json(validations)
        }
        else{
            next();    
        }
    }

    else
        res.status(200).json({"message" : "No attribute was received to update"})
};

module.exports= validateDealPut;