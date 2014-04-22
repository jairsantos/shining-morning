var util       = require('util')
  , events     = require('events')
  ;

var FeedFilter = function(){
  events.EventEmitter.call(this);
};

util.inherits(FeedFilter, events.EventEmitter);

var fn = FeedFilter.prototype;

fn.proc = function(data, filterParams) {
  for(param in filterParams) {
    var lowerFilter = filterParams[param].toLowerCase()
      , lowerData   = data[param].toLowerCase()
      , filter      = new RegExp(lowerFilter)
      ;

    if (lowerData.match(filter)) {
      this.emit('data', data);
      break;
    }
  }
}

module.exports = FeedFilter;
