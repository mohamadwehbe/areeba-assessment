const express = require('express')
const router = express.Router()

const ValidateController = require('../controllers/validateController')

router.post('/', ValidateController.validateNmber)

module.exports = router