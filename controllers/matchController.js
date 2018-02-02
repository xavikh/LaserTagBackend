

var match = require('../controllers/CurrentMatch')

function create(req, res) {
  //TODO: Errors
  var duration = req.body.duration;
  var mode = req.body.mode;
  match.getInstance().set(duration, mode);
  res.sendStatus(200);
})

function start(req, res) {
  //TODO:
  res.status(200).send(match.getInstance().start())
})

function addPlayer(req, res) {
  //TODO: Errors
  var nick = req.body.nickname;
  var idGun = req.body.idGun;
  var team = req.body.team;
  match.getInstance().addPlayer(nick, idGun, team);
  res.sendStatus(200);
})

function shot(req, res) {
  //TODO:
  res.status(200).send(match.getInstance().addShot(0,3))
})

function clean(req, res) {
  //TODO:
  res.status(200).send(match.getInstance().clean())
})

function debug(req, res) {
  res.status(200).send(match.getInstance().debug())
})

function modes(req, res) {
})
