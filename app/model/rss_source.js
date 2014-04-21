var ModelBase = require('./base');
var RssSource = ModelBase('RssSource', {
  "address"  : String
 ,"category" : String 
 ,"language" : String 
 ,"country"  : String 
 ,"domain"   : String 
 ,"keywords" : String 
});
module.exports = RssSource;