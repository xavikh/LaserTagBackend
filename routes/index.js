'use strict'

const express = require ('express')
const api = express.Router()

var match = require('../controllers/CurrentMatch')

api.get('/test', function(req, res) {
  console.log(match.getInstance())
  match.getInstance().set(20, "allvsall")
  match.getInstance().start()
  match.getInstance().addPlayer("xavikh1", 2, "blue")
  match.getInstance().addPlayer("xavikh2", 0, "blue")
  match.getInstance().addPlayer("xavikh3", 3, "red")
  console.log(match.getInstance())
  res.status(200).send(match);
})



module.exports = api
