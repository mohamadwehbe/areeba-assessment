const express = require('express')
const router = express.Router()

const CustomerController = require('../controllers/customerController')

router.get('/', CustomerController.index)
router.post('/getById', CustomerController.show)
router.post('/create', CustomerController.store)
router.post('/update', CustomerController.update)
router.post('/delete', CustomerController.destroy)

module.exports = router