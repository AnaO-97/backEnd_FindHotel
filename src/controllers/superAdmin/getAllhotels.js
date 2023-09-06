const { Hotel } = require("../../models/index");

const getAllhotels = async (req, res) => {
    try {                
        const [ queryKey ]   = Object.keys(req.query);
        const [ queryValue ] = Object.values(req.query);

        if (queryKey !== null && queryKey !== undefined && queryKey !== ""){
            const attributes = [ "name", "category", "country", "state" ];

            if(attributes.includes(queryKey)){
                console.log(queryKey, queryValue);

                const allHotels = await Hotel.find({ [ queryKey ] : queryValue });

                if (allHotels.length > 0)
                    res.status(200).json({
                        "quantity"   : allHotels.length, 
                        [ queryKey ] : queryValue, 
                        "hotels"     : allHotels
                    });
                else
                    res.status(202).json({"message": "There are no Hotels in the database"});        
            }
            
            else{
                res.status(400).json({ 
                    "error" : `The entered { key : ${queryKey} } does not match any hotels attribute to filter`,
                    "wrong" : { [ queryKey ] : queryValue },
                    "rigth" : attributes
                })
            }    
        }
        else{
            const allHotels = await Hotel.find();          

            if (allHotels.length > 0)
                res.status(200).json({"quantity" : allHotels.length, "hotels" : allHotels});
            else
                res.status(202).json({"message": "There are no Hotels in the database"});
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getAllhotels;