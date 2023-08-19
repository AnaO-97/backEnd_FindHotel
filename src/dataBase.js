const mongoose = require("mongoose");
require("dotenv").config();
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;


const dataBase = () => {


<<<<<<< HEAD
    mongoose.connect(`mongodb+srv://${DB_NAME}:${DB_PASSWORD}@${DB_USER}.lmykssy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
=======
    mongoose.connect(`mongodb+srv://${DB_NAME}:${DB_PASSWORD}@${DB_USER}.lmykssy.mongodb.net?retryWrites=true&w=majority`, {
>>>>>>> 739b31c69421773d55e77ad8cd3d41ddf6ded370

        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => console.log(error))
    // .finally(() => {
    //     mongoose.disconnect()
    //         .then(() => console.log('Conexión cerrada'))
    //         .catch(error => console.error('Error al cerrar la conexión:', error));
    // })
};

module.exports = dataBase;