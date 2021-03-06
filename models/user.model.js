const mongo = require("mongoose");

// const User = mongo.Schema({
//     name: {
//         firstName: {
//             type: String,
//             required: true
//         },
//         secondName: {
//             type: String,
//             required: true
//         }
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number,
//         required: true
//     },
//     passport: {
//         type: String,
//         required: true
//     },
//     gender: {
//         type: String,
//         required: true
//     },
//     contactNo: [{
//         type: Number
//     }],
//     email: {
//         type: String,
//         required: true
//     },
//     socialMedia: [{
//         name: {
//             type: String
//         },
//         handle: {
//             type: String
//         }
//     }],
//     role: {
//         type: String,
//         enum: ['USER', 'ADMIN', 'EXT_DEV', 'MODERATOR']
//     },
//     profileImage: {
//         type: String
//     }
// })

const User = mongo.Schema({
    firstName: {
        type: String,
        required: true
    },
    secondName: {
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
    gender: {
        type: String,
        required: true
    },
    mobile: {
        type: Number
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN', 'DEV', 'TESTER', "PROJECT_MANAGER"]
    },
    profileImage: {
        type: String
    }
});

module.exports = mongo.model("users", User);