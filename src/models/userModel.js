const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["User", "Hotel", "Admin"],
        default: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Supended", "Banned"],
        default: "Supended",
    },

}, { timestamps: true });


//              Metodos

//Encriptar Password
userSchema.methods.encryptPassword = async (password) => {
    let salt = await bcrypt.genSalt(10);
    let ecnrypted = await bcrypt.hash(password, salt);
    return ecnrypted;
};

//Matchear password para login
userSchema.methods.matchPassword = async function (password) {
    const matched = await bcrypt.compare(password, this.password);
    return matched;
};

//Creación de modelo
const User = model("User", userSchema);
module.exports = User;