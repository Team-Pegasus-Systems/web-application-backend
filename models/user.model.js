const mongo = require("mongoose");

const User = mongo.Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        secondName: {
            type: String,
            required: true
        }
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    passport: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    contactNo: [{
        type: Number
    }],
    email: {
        type: String,
        required: true
    },
    socialMedia: [{
        name: {
            type: String
        },
        handle: {
            type: String
        }
    }],
    role: {
        type: String,
        enum: ['USER', 'ADMIN', 'EXT_DEV', 'MODERATOR']
    },
    profileImage: {
        type: String
    }
})

module.exports = mongo.model("users", User);