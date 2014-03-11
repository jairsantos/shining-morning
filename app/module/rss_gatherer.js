var FeedParser = require('feedparser')
  , request    = require('request')
  , util       = require('util')
  , events     = require('events')
  ;

// TODO: Need to do the error's treatment
RssGatherer = function(){
  events.EventEmitter.call(this);
};

util.inherits(RssGatherer, events.EventEmitter);

var fn = RssGatherer.prototype;

fn.gather = function(rss_source){
  var req        = request(rss_source.address)
    , feedparser = new FeedParser()
    ;

  req.on('response', function(){ this.pipe(feedparser); });

  // TODO: Should refactor this name of this var "_this"
  _this = this;

  feedparser.on('readable', function(){ 
    while(item = this.read()) {
      _this.emit('data', item);
    }
  });
};

module.exports = RssGatherer;