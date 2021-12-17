const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    "_id": {
        type: String,
        required: true
    },
    "firstName": {
        type: String,
        required: true
    },
    "lastName": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "roleId": {
        type: String,
        required: true
    },
    "phone": {
        type: Number,
        required: true
    },
    "interests": {
        type: String,
        required: true
    },
    "address": {
        type: [String, String, String, Number],
        required: true
    }
})

module.exports = mongoose.model('User', UsersSchema, 'Users');