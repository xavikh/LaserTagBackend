'use strict'

function sameTeam(player1, player2){
  return player1.team == player2.team;
}

function isAlive(player){
  return player.lifePoints > 0;
}

function hasStarted(match){
  return match.startupTime > 0;
}

function hasFinished(match){
  return Date.now() < (match.startupTime + match.duration);
}

module.exports = {
  sameTeam,
  isAlive,
  hasStarted,
  hasFinished
}
