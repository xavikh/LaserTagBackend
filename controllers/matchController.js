'use strict'

const Match = require('../models/match')
const config = require('../config')

var currentMatch = new Match();

function getMatch(req, res) {
  var cMatch = currentMatch;
  var elapsedTime = Date.now() - cMatch.startupTime;
  cMatch.elapsedTime = (elapsedTime < cMatch.duration*1000)?elapsedTime:cMatch.duration*1000;
  cMatch.leftTime = cMatch.duration*1000 - cMatch.elapsedTime;
  cMatch.inGame = (cMatch.leftTime)?true:false;
  res.status(200).send(currentMatch);
}

function newMatch(req, res) {
  var duration = req.body.duration;
  var type = req.body.type;
  currentMatch = new Match(duration, type);
  res.status(200).send(currentMatch);
}

function start(req, res) {
  res.status(200).send(currentMatch.start());
}

function getPlayer(req, res) {
  var nick = req.query.nick;
  var idGun = req.query.idGun;
  var player;
  if(nick){
    for (var i = 0; i < currentMatch.players.length; i++) {
      if(currentMatch.players[i] && currentMatch.players[i].nick == nick)
        player = currentMatch.players[i];
    }
  } else if(idGun){
    player = currentMatch.players[idGun];
  } else {
    player = {}
  }
  res.status(200).send(player);
}

function addPlayer(req, res) {
  var nick = req.body.nick;
  var idGun = req.body.idGun;
  var team = req.body.team;
  res.status(200).send(currentMatch.addPlayer(nick, idGun, team));
}

function addShot(req, res) {
  var idGun = req.body.idGun;
  var idVest = req.body.idVest;
  res.status(200).send(currentMatch.addShot(idGun, idVest));
}

function getShots(req, res) {
  res.status(200).send(currentMatch.shots);
}

function restart(req, res) {
  currentMatch.restart();
  res.status(200).send(currentMatch);
}

function getModes(req, res) {
  res.status(200).send({ modes: config.MODES})
}

module.exports = {
  getMatch,
  newMatch,
  start,
  getPlayer,
  addPlayer,
  getShots,
  addShot,
  restart,
  getModes
};
