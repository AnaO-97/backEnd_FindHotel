const User = require("../models/userModel")


const userDelete = async (req, res) => {
    const id = req.params._id;
    try {
        const inactiveUser = await User.updateById({id}, { status: 'Inactive' });
        if(!inactiveUser) res.status(400).json({message: 'User Not Found'})
        res.status(200).json({message: 'User desactivated successfully'})
    } catch (error) {
        res.status(500).json({error})
    }
}
module.exports= userDelete;