const exec = require('child_process').exec
const config = require('../config')

function play(sound){
  if(config.sound){
    var mp3File;
    switch(sound){
      case "shot":
        mp3File = "shot.mp3"
        break;
    }
    exec(`${config.vlcDir} -I dummy ./sounds/${mp3File}`, function (error, stdout, stderr) {
      if (error) console.log(error)
      else console.log("Pium pium  ------->>>")
    });
  }
}

module.exports = play;
