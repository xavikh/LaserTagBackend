'use strict'

const express = require ('express')
const api = express.Router()

api.get('/test', function(req, res) {
  res.sendStatus(200);
})

module.exports = api
