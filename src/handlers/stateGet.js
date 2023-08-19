const stateList = require("../controllers/stateList.js")

const stateGet=async(req, res)=>{
    try{
        const {country}=req.params
        
        const states=await stateList(country)

        res.status(200).json(states);
    } catch (err) {
        res.status(500).json(err);
    }
}
module.exports = stateGet;