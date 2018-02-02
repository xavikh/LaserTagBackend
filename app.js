'use strict'

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const api = require ('./routes')
//const cors = require ("cors")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//app.use(cors())
app.use('/', api)

module.exports = app
