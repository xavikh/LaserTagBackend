'use strict'

const mongoose = require ("mongoose")
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log(`Node server running on http://localhost:${config.port}`);
});
});
