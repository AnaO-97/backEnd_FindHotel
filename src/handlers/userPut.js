const userUpdate = require("../controllers/user/userUpdate");

/*
    La ruta put:/user recibe en su "req.body" el objeto "userUpDate_Obj" con dos propiedades
        
        userUpDate_Obj = {
            id_userUpdate  : UUID,
            attsUpdate_Obj : { contiene en forma de clave y 
                valor las propiedades que se van a actualizar 
            }
        }
            
    Dichos atributos los require el controlador para indicarle al esquema User, por medio del 
    id_userUpdate, que usuario debe actualizarle, y atraves de attsUpdate_Obj se especifica el nombre 
    del atributo y el volor por el cual acrualizarlo
*/

const userPut = async (req, res) => {
    try {
        const atts_UserSchema = ["firstName", "lastName", "age", "email", "password", "phone", "country", "city", "status"];
        const userUpDate_Obj = req.body;
        const { id_userUpdate, atts_userUpdate } = userUpDate_Obj;


        for (const attribute in atts_userUpdate) {
            if (!atts_UserSchema.includes(attribute))
                throw new Error(`The <--${attribute}--> attribute that you want to update is not valid`);
        }

        const userUpdated = await userUpdate(id_userUpdate, atts_userUpdate);

        if (userUpdated)
            res.status(200).json(userUpdated)
        else
            throw new Error("The user ID does not match any user registered in the database");

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

module.exports = userPut;