var Websocket = require('./app/module/Websocket');

var websocket = new Websocket();

websocket.start();

websocket.on('request:start', function(user_filter_parameters){
  rss_stream = RssSource.find(user_filter_parameters).stream();
})

rss_gatherer.on('data', function(data){ 
  // TODO: Here will be used to call filter funcion.
  //console.log(data.title);
  // filtro.filter(data, filtro)
});

filtro.on('data', function(json){
  websocket.response(json);
});