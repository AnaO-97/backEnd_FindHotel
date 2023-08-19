const User = require("../models/userModel")


const userDelete = async (req, res) => {
    const id = req.params._id;
    try {
        const userDelete = await User.findByIdAndDelete(id)
        if(!userDelete) res.status(500).json({message: 'Not found'})
        res.status(200).json({message: 'User deleted successfully'})
    } catch (error) {
        res.status(500).json({error})
    }
}
module.exports= userDelete;