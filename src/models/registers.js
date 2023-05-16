const mongoose = require("mongoose");

const{Schema} = mongoose;

const student = new Schema({
    Roll: {
        type: Number,
        //required: true,
        unique: true
    },
    Name: {
        type: String,
        //required: true
    },
    Dob: {
        type: String,
        //required: true
    },
    Score: {
        type: Number,
       // required: true
    }
})



//const Register = new mongoose.model("Register", student);

module.exports = mongoose.model("Register", student);