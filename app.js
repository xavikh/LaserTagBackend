'use strict'

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mainRoutes = require ('./routes')
const matchRoutes = require ('./routes/matchRoutes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', mainRoutes)
app.use('/match', matchRoutes)

module.exports = app
