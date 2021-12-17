const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    "_id": {
        type: String,
        required: true
    },
    "userId": {
        type: String,
        required: true
    },
    "userEmail": {
        type: String,
        required: true
    },
    "cart": {
        type: Schema.Types.Mixed,
        ref: 'Products',
        required: true
    },
    "orderTotal": {
        type: Number,
        required: true
    },
    "date": {
        type: String,
        required: true
    },
    "delivered": {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Order', OrdersSchema, 'Orders');