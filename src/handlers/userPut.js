const userUpdate = require("../controllers/userUpdate");

/*
    La ruta put:/user recibe en su "req.body" el objeto "userUpDate_Obj" con dos propiedades
        
        userUpDate_Obj = {
            id_userUpdate  : UUID,
            attsUpdate_Obj =: { contiene en forma de clave y 
                valor las propiedades que se van a actualizar 
            }
        }
            
    Dichos atributos los require el controlador para indicarle al esquema User, por medio del 
    id_userUpdate, que usuario debe actualizarle, y atraves de attsUpdate_Obj se especifica el nombre 
    del atributo y el volor por el cual acrualizarlo
*/

const userPut = async (req, res) => {
    try {
        const userUpDate_Obj = req.body;        

        const userUpdated = await userUpdate(userUpDate_Obj);
        res.status(200).json(userUpdated)

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

module.exports = userPut;