!function(){
  var RssSource   = require('../app/model/rss_source')
    , rss_sources = require('./data/rss_sources');

  console.log('Inserting new RSS\'s to the data base...');
  for ( i in rss_sources ) { 
    rss_source = new RssSource(rss_sources[i]);
    rss_source.save();
    console.log('Including data for ' + rss_source.domain);
  }
  console.log('Terminado!\nUse Ctrl + C para sair.');
}();