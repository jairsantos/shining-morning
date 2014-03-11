require('./app/model/base');
require('./app/model/rss_source');

var RssGatherer = require('./app/module/rss_gatherer');

var rss_gatherer = new RssGatherer();

// TODO: This point will be filtred with WEBSOCKET redirect
// information.
rss_stream = RssSource.find({"language":"en"}).stream();

rss_gatherer.on('data', function(data){ 
  // TODO: Here will be used to call filter funcion.
  console.log(data.title);
});

rss_stream.on('data', function(data){
  rss_gatherer.gather(data);
});