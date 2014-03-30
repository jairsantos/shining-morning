var io         = new SocketIO
  , util       = require('util')
  , events     = require('events')
  ;

// TODO: Need to do the error's treatment
WebSocket = function(){
  events.EventEmitter.call(this);
};

// This point say that RssGather will inherit EventEmitter
util.inherits(WebSocket, events.EventEmitter);

var fn = WebSocket.prototype;

fn.start = function(){
  // Run WebSocket
};

fn.response = function(response) {
  // Send to use `response`
}

// User Request from Socket.IO lib
io.on('request:start', function(io_send) {
  this.emit('data', io_send);
})

module.exports = WebSocket;
