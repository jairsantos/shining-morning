var RssSource   = require('./app/model/rss_source')
  , Websocket   = require('./app/module/websocket')
  , RssGatherer = require('./app/module/rss_gatherer')
  , websocket   = new Websocket()
  , rssGatherer = new RssGatherer()
  ;

websocket.start();

websocket.on('request:start', function(userFilterParams){
  userFilter = JSON.parse(userFilterParams);

  rssFilter = RssSource.find(userFilter);
  rssStream = rssFilter.stream();

  rssStream.on('data', function(data){
    rssGatherer.gather(data);
  });
});

rssGatherer.on('data', function(data){
  websocket.response(JSON.stringify(data));
});
