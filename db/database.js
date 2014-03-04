module.exports = exports = Database;

function Database() {
  var config   = require('./config')
    , mongoose = require('mongoose')
    ;

  this.start = function() {
    mongoose.connect(config.host_addr + config.database);
  }
}