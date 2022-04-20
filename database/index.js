/**
 * INDEX
 * Launchpoint file for the database
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./router')(app);

app.use(express.static('static'))
app.listen(3001, function() {
    console.log('Server started at port 3001')
});    //can custom set the localhost