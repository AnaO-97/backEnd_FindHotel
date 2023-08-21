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
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (value) => {
                return /^((?!^[._%+-])(?![._%+-]{2,})[a-zñ0-9._%+-]){5,29}[a-zñ0-9]+@(([\w-]+)+\.+[\w-]{2,4})$/.test(value);
            },
            message: ({ value }) => `${value} it is not a valid mail.`
        }
    },
    image: {
        type: String,
        required: false,
        validate: {
            validator: (value) => {
                return /\.(jpg|jpeg|png|gif)$/i.test(value);
            },
            message: ({ value }) => `${value} is not a valid image URL.`
        }
    },
    age: {
        type: Number,
        required: false,
        min: 18,
        max: 120,
        validate: {
            validator: (value) => {
                return Number.isInteger(value);
            },
            message: ({ value }) => `${value} no es una edad válida.`
        }
    },
    phone: {
        type: Number,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ["User", "Hotel", "Admin"],
        default: "User",
        required: false
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Supended", "Banned"],
        default: "Supended",
        required: false
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