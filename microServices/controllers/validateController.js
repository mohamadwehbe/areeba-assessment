const axios = require('axios')

const validateNmber = async (req, res, next) => {

    let phoneNumber = req.body.phoneNumber;

    // Retrieve number details from Numverify API
    await axios.get(`http://apilayer.net/api/validate?access_key=2cbbaf31cf95d0d3a698ca8503aca00a&number=${phoneNumber}&country_code=&format=1`)
        .then(response => {
            res.json({
                countryCode: response.data.country_code,
                countryName: response.data.country_name,
                operatorName: response.data.carrier || 'Unknown',
                valid: response.data.valid
            })
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured!'
            })
        })
}

module.exports = { validateNmber }