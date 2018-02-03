'use strict'

const express = require ('express')
const api = express.Router()

var match = require('../controllers/CurrentMatch')

api.post('/create', function(req, res) {
  //TODO: Errors
  var duration = req.body.duration;
  var mode = req.body.mode;
  match.getInstance().set(duration, mode);
  res.sendStatus(200);
})

api.post('/start', function(req, res) {
  //TODO:
  res.status(200).send(match.getInstance().start())
})

api.post('/addPlayer', function(req, res) {
  //TODO:
  match.getInstance().addPlayer("xavikh1", 2, "blue")
})

api.post('/shot', function(req, res) {
  //TODO:
  res.status(200).send(match.getInstance().addShot(0,3))
})

api.post('/clean', function(req, res) {
  //TODO:
  res.status(200).send(match.getInstance().clean())
})

api.post('/restart', function(req, res) {
  //TODO:
  res.status(200).send(match.getInstance().restart())
})

api.get('/debug', function(req, res) {
  res.status(200).send(match.getInstance().debug())
})

api.get('/modes', function(req, res) {
})

module.exports = api
