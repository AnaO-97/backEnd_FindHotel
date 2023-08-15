const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({

    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true
        },
    },
}
);

const User = mongoose.model("User", userSchema);
// console.log(User);
module.exports = User;