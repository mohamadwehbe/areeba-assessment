const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    mobileNumber: {
        type: Number
    }
}, { timestamps: true })

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer