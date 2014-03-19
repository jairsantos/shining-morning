// This module is responsible for getting RSS content 
// from the internet.
// Caller have to pass as a parameter the rss links which 
// is going to be gather.

// Module's dependences
// FeedParses: It is a module which parses a RSS into Json;
// request: It is a module which makes the request to the Rss Souces;
// util: Module from NodeJS. Here it is beeing used from inheritness.
// events: It is the class which is responsible for emitting events.
var FeedParser = require('feedparser')
  , request    = require('request')
  , util       = require('util')
  , events     = require('events')
  ;

// TODO: Need to do the error's treatment
RssGatherer = function(){
  events.EventEmitter.call(this);
};

// This point say that RssGather will inherit EventEmitter
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
