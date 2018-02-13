'use strict'

const config = require('../config')
const utils = require('../services/matchUtils')
const soundFX = require('../services/soundFX')
const Shot = require('./shot')

var MODE = Object.freeze({"2vs2":4, "1vs1":2, "allvsall":0})

function Match(duration, type) {
  this.duration = duration || 300, //seconds
  this.startupTime = 0,
  this.type = type || "2vs2",
  this.players = [],
  this.shots = [],

  this.start = function(){
    if(this.type == "allvsall" || this.players.length == MODE){
      this.startupTime = Date.now();
      return true;
    }
    return false;
  },

  this.addPlayer = function(nick, idGun, team) {
    var player = {
      nick: nick,
      lifes: config.lifes,
      lifePoints: config.lifePoints,
      points: 0,
      kills: 0,
      deaths: 0,
      team: team
    }
    this.players[idGun] = player;
    return player;
  },

  this.addShot = function(idGun, idVest) {
    var attacker = this.players[idGun];
    var injured = this.players[idVest];
    console.log(attacker)
    console.log(injured)
    if(attacker && injured &&
    !utils.sameTeam(attacker, injured) &&
    utils.isAlive(attacker) && utils.isAlive(injured) &&
    utils.hasStarted(this) && utils.hasFinished(this)){
      var shot = new Shot();

      attacker.points += config.pointsPerShotAttacker;
      injured.lifePoints -= config.pointsPerShotInjured;
      if(utils.isAlive(injured)){
        attacker.points += config.pointsPerKill;
        attacker.kills++;
        injured.deaths++;
        injured.lifes--;
        if(injured.lifes > 0){
          let self = this;
          console.log("Reviviendo al jugador " + idVest)
          setTimeout(function (){
            self.revive(idVest)
          }, config.reviveDelay);
        }
      }
      this.shots.push(shot);
      soundFX("shot");

      return true;
    }
    return false;
  },

  this.restart = function() {
    this.startupTime = Date.now();
    this.shots = [];
  }

  this.revive = function(id) {
    console.log("Ha revivido el jugador " + id)
    this.players[id].lifePoints = config.lifePoints;
  }

}

module.exports = Match;
