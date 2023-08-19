const validationUserPost = async (req, res, next) => {
    try {
        const attributes = Object.keys(req.body);

        const atts_UserSchema = ["firstName", "lastName", "age", "email", "password", "phone", 
               "country", "state", "role", "status" ];

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