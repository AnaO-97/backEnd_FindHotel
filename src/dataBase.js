const mongoose = require("mongoose");
require("dotenv").config();
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const dataBase = () => {


    mongoose.connect(`mongodb+srv://findhotel:${DB_PASSWORD}@${DB_USER}.8ocs4hu.mongodb.net/${DB_NAME}`, {

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