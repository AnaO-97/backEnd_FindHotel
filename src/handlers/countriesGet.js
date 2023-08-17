const countriesList = require("../controllers/countriesList.js")

const countriesGet=async(req, res)=>{
    try{
        const countries=await countriesList()
        res.status(200).json(countries);
    }catch(err){
        res.status(500).json(err);
    }
}
module.exports = countriesGet;