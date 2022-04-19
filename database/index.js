/**
 * NOTE: This is a copy of my index.js in exer 10 in CMSC 100
 * Carlos Angelo L. Rayel | 19-04-2022
 */

const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: false }))

require('./router')(app)

app.use(express.static('static'))
app.listen(3001, () => {console.log('Server started at port 3001')})    //can custom set the localhost