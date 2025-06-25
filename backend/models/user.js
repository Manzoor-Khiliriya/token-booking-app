const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    phone_number: {
        require: true,
        type: String
    },
    date_of_birth: {
        require: true,
        type: Date
    },
    gender: {
        require: true,
        type: String
    },
    place: {
        require: true,
        type: String
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User;
