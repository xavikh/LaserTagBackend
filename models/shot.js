'use strict'

function Shot(idGun, idVest) {
  this.timestamp = Date.now(),
  this.idGun = idGun,
  this.idVest = idVest
 }

module.exports = Shot;
