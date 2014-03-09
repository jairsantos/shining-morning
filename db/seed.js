require('../app/model/base');
require('../app/model/rss_source');

var rss_sources = require('./rss_data_sources');

for ( i in rss_sources ) { 
  rss_source = new RssSource(rss_sources[i]);
  rss_source.save();
}