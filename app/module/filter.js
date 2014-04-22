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
    var filter = new RegExp(filterParams[param]);
    if (data[param].match(filter)) {
      this.emit('data', data);
      break;
    }
  }
}

module.exports = FeedFilter;
