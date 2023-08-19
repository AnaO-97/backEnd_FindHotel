const stateList = require("../controllers/stateList.js")

const stateGet=async(req, res)=>{
    try{
<<<<<<< HEAD
        const {country}=req.params
=======
        const country=req.params.country
>>>>>>> 739b31c69421773d55e77ad8cd3d41ddf6ded370
        const states=await stateList(country)
        res.status(200).json(states);
    }catch(err){
        res.status(500).json(err);
    }
}
module.exports = stateGet;