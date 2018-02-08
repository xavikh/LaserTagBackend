'use strict'

const soundFX = require('../services/soundFX')

var MODE = Object.freeze({"2vs2":4, "1vs1":2, "allvsall":0})

function revive(id) {
    match.players[id].lifePoints = lifePoints;
}

var CurrentMatch = (function () {
    var instance;

    function createInstance() {
        var match = new Object();
        match.duration = 300; //seconds
        match.startupTime = 0;
        match.type = "2vs2";
        match.players = [];
        match.shots = [];

        match.set = function(duration, type) {
          match.duration = duration * 1000;
          match.type = type;
        }

        match.start = function() {
          if(match.type == "allvsall" || match.players.length == MODE){
            match.startupTime = Date.now();
            return true;
          }
          return false;
        }

        match.addPlayer = function(nick, idGun, team) {
          var player = {
            nick: nick,
            lifes: config.lifePoints,
            lifePoints: config.lifes,
            points: 0,
            kills: 0,
            deaths: 0,
            team: team
          }
          match.players[idGun] = player
        }

        match.addShot = function(idGun, idVest) {
          if(match.players[idGun].team != match.players[idVest].team &&
              match.players[idGun].lifePoints > 0 &&
              match.players[idVest].lifePoints > 0 &&
              match.startupTime > 0 &&
              Date.now() < (match.startupTime + match.duration)){
            var shot = {
              timestamp: Date.now(),
              idGun: idGun,
              idVest: idVest
             }
             match.players[idGun].points += 10;
             match.players[idVest].lifePoints -= 10;
             if(match.players[idVest].lifePoints < 1){
               match.players[idGun].points += 100;
               match.players[idGun].kills++;
               match.players[idVest].deaths++;
               match.players[idVest].lifes--;
               if(match.players[idVest].lifes > 0){
                 setTimeout(revive(idVest), 3000);
               }
             }
             match.shots.push(shot);
             soundFX("shot");

             return true;
           }
           return false;
        }

        match.restart = function() {
          match.startupTime = Date.now();
          match.shots = [];
        }

        match.clean = function() {
          var match = new Object();
        }

        match.debug = function() {
          console.log(match);
        }

        return match;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports = CurrentMatch;
