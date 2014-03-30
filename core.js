require('./app/model/base');
require('./app/model/rss_source');
require('./app/model/filtro');

// RssGatherer is the system's module which is responsible 
// for getting news from the Intenet using RSS links.
var RssGatherer = require('./app/module/rss_gatherer');

// This point instances a new RssGatherer object.
var rss_gatherer = new RssGatherer();

// TODO: This point will receive params of filter from the
// WEBSOCKET, which is redirecting user's filter params.
var user_filter_parameters = {"language":"en"};

// It will filter in RssSource persisted data all collections which 
// holds links which match user's filters params.
rss_stream = RssSource.find(user_filter_parameters).stream();

// That point intercept all `data` event which is returned
// by RssGatherer. This event is emitted everytime a new
// RSS Content comes from the News Website response.
rss_gatherer.on('data', function(data){ 
  // TODO: Here will be used to call filter funcion.
  
  var filtro = {
  	author : null,
  	title : "tecnologia",
  	categories: [ 'noticias' ]
  };

  console.log(data);
  console.log(filtro);

  filtrarFeed(data, filtro);

});

// This point listen RSSSource.find() results. Everytime database
// retreive a new record, this event interceptor will call RssGather
// to get more content from the internet.
rss_stream.on('data', function(data){
  rss_gatherer.gather(data);
});
