const validationUserPost = async (req, res, next) => {
    try {
        const attributes = Object.keys(req.body);

        const atts_UserSchema = ["firstName", "lastName", "email"];

        atts_UserSchema.forEach(att => {
            if(!attributes.includes(att))
                throw new Error('To create a user, all the data is required')

        });        

        next()

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

module.exports = validationUserPost;