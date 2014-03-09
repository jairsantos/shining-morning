Database = function() {
  var config   = require('../config/database')
    , mongoose = require('mongoose')
    ;
  mongoose.connect(config.host_addr + config.database);
  return mongoose;
}

module.exports = Database;