const mongoose = require("mongoose");
require("dotenv").config();
const { DB_NAME, DB_PASSWORD } = process.env;

const dataBase = () => {
    mongoose.connect(`mongodb+srv://findhotel:${DB_PASSWORD}@${DB_NAME}.8ocs4hu.mongodb.net/?retryWrites=true&w=majority`)
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => console.log(error))
    // .finally(() => {
    //     mongoose.disconnect()
    //         .then(() => console.log('Conexión cerrada'))
    //         .catch(error => console.error('Error al cerrar la conexión:', error));
    // })
};

module.exports = dataBase;