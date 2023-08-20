const mongoose = require("mongoose");
require("dotenv").config();
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;


const dataBase = async () => {
    await mongoose.connect(`mongodb+srv://${DB_NAME}:${DB_PASSWORD}@${DB_USER}.lmykssy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => console.log(error))
};

module.exports = dataBase;