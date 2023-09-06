const { User } = require("../../models/index");

const getAllUsers = async (req, res) => {
    try {        
        const [ queryValue ] = Object.values(req.query);

        if (queryValue !== null && queryValue !== undefined && queryValue !== ""){
            const role = [ "Hotel", "User" ];
            console.log("queryValue ", queryValue)

            if(role.includes(queryValue)){
                const allUsers = await User.find({ "role" : queryValue });

                if (allUsers.length > 0)
                    res.status(200).json({"quantity" : allUsers.length, "role" : queryValue, "users" : allUsers});
                else
                    res.status(202).json({"message": "There are no Users in the database"});
            }
            
            else{
                res.status(400).json({ "error": `The entered { value : ${queryValue} } does not match any role` })
            }    
        }
        else{
            const allUsers = await User.find();          

            if (allUsers.length > 0)
                res.status(200).json({"quantity" : allUsers.length, "users" : allUsers});
            else
                res.status(202).json({"message": "There are no Users in the database"});
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = getAllUsers;