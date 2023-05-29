const { default: axios } = require('axios')
const Customer = require('../models/customer')

// List of Customers
const index = (req, res, next) => {
    Customer.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured!'
            })
        })
}

// Find Customer by ID
const show = (req, res, next) => {
    let customerID = req.body.customerID
    Customer.findById(customerID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured!'
            })
        })
}

// Create Customer
const store = async (req, res, next) => {

    await axios.post(`http://localhost:3001/api/validate-number`, { phoneNumber: req.body.mobileNumber })
        .then((x) => {
            if (x.data.valid) {
                let customer = new Customer({
                    name: req.body.name,
                    address: req.body.address,
                    mobileNumber: req.body.mobileNumber
                })
                customer.save()
                    .then(response => {
                        res.json({
                            message: 'Customer Added!'
                        })
                    })
                    .catch(error => {
                        res.json({
                            message: 'An Error Occured!'
                        })
                    })
            } else {
                res.json({
                    message: 'Mobile Number Is Not Valid!'
                })
            }
        })
        .catch(error => {
            res.json({
                message: 'Mobile Number Is Not Valid!'
            })
        })
}

// Update Customer
const update = async (req, res, next) => {
    let customerID = req.body.customerID
    let updatedData = {
        name: req.body.name,
        address: req.body.address,
        mobileNumber: req.body.mobileNumber
    }
    await axios.post(`http://localhost:3001/api/validate-number`, { phoneNumber: req.body.mobileNumber })
        .then((x) => {
            if (x.data.valid) {
                Customer.findByIdAndUpdate(customerID, { $set: updatedData })
                    .then(response => {
                        res.json({
                            message: 'Customer Updated!'
                        })
                    })
                    .catch(error => {
                        res.json({
                            message: 'An Error Occured!'
                        })
                    })
            }
            else {
                res.json({
                    message: 'Mobile Number Is Not Valid!'
                })
            }
        })
        .catch(error => {
            res.json({
                message: 'Mobile Number Is Not Valid!'
            })
        })
}

// Delete Customer
const destroy = (req, res, next) => {
    let customerID = req.body.customerID

    Customer.findOneAndRemove(customerID)
        .then(response => {
            res.json({
                message: 'Customer Deleted!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured!'
            })
        })
}

module.exports = {
    index, show, store, update, destroy
}