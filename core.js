var RssSource    = require('./app/model/rss_source')
  , Websocket    = require('./app/module/websocket')
  , RssGatherer  = require('./app/module/rss_gatherer')
  , FeedFilter   = require('./app/module/filter')
  , Params       = require('./app/utils/params')
  , websocket    = new Websocket()
  , rssGatherer  = new RssGatherer()
  , feedFilter   = new FeedFilter()
  , filterParams = new Params()
  ;

var PRE_FILTERS = ['language'];

var FILTERS = ['title']

websocket.on('request:start', function(userFilterParams){
  var userFilter = JSON.parse(userFilterParams);

  filterParams.merge(userFilter);

  var preFilter = filterParams.select(PRE_FILTERS);

  rssFilter = RssSource.find(preFilter);
  rssStream = rssFilter.stream();

  rssStream.on('data', function(data){
    rssGatherer.gather(data);
  });
});

rssGatherer.on('data', function(data){
  feedFilter.proc(data, filterParams.select(FILTERS));
});

feedFilter.on('data', function(data){
  websocket.response(JSON.stringify(data));
});

websocket.start();
