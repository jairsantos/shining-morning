require('./app/model/base');
require('./app/model/rss_source');

rss_stream = RssSource.find().stream();

rss_stream.on('data', function(data){
  console.log(data);
});

rss_stream.on('error', function(error){
  console.log('An error occurred: ' + error);
});

rss_stream.on('close', function(error){
  console.log('Conexão encerrada!');
});