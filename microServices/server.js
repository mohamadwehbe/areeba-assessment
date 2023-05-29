const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const ValidateRoute = require('./routes/validateRoute')

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`MicroService running on port ${PORT}`);
});

app.use('/api/validate-number', ValidateRoute)