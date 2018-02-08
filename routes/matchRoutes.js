'use strict'

const express = require ('express')
const api = express.Router()

var match = require('../controllers/matchController')

api.get('/', match.getMatch)
api.post('/', match.newMatch)
api.put('/start', match.start)
api.get('/player', match.getPlayer)
api.post('/player', match.addPlayer)
api.post('/shot', match.addShot)
api.get('/shot', match.getShots)
api.put('/restart', match.restart)
api.get('/modes', match.getModes)

module.exports = api
