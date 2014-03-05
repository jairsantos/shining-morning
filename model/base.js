var Database = require('../db/database')
  , database = new Database()
  ;

ModelBase = function(name, attr) {
  return database.model(name, attr);
}