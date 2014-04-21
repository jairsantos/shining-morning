var Database = require('../../db/database')
  , database = new Database()
  ;

var ModelBase = function(name, attr) {
  return database.model(name, attr);
}
module.exports = ModelBase;