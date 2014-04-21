var RssSource   = require('./app/model/rss_source')
  , Websocket   = require('./app/module/websocket')
  , RssGatherer = require('./app/module/rss_gatherer')
  , Filter      = require('./app/module/filtro')
  , websocket   = new Websocket()
  , rssGatherer = new RssGatherer()
  , filter      = new Filter()
  ;

// Teste
var filtro = {
  author     : null,
  title      : "Cubans",
  categories : null
};

websocket.on('request:start', function(userFilterParams){
  userFilter = JSON.parse(userFilterParams);

  rssFilter = RssSource.find(userFilter);
  rssStream = rssFilter.stream();

  rssStream.on('data', function(data){
    rssGatherer.gather(data);
  });
});

rssGatherer.on('data', function(data){
  filter.filtrarFeed(data, filtro);
});

filter.on('filter:complete', function(data){
  websocket.response(JSON.stringify(data));
});

websocket.start();
