var WebSocketServer = require('ws').Server
  , webSocketConf   = require('../../config/websocket')
  , util            = require('util')
  , events          = require('events')
  ;

// TODO: Need to do the error's treatment
WebSocket = function(){
  this.ws = new WebSocketServer(webSocketConf);
  this._  = null; 
  events.EventEmitter.call(this);
};

// This point say that RssGather will inherit EventEmitter
util.inherits(WebSocket, events.EventEmitter);

var fn = WebSocket.prototype;

fn.start   = function(){
  var wss  = this.ws
    , self = this
    ;

  // Treat other events after
  wss.on('connection', function(ws) {
    ws.on('message', function(message) {
      self.emit('request:start', message);
      self._ = this;
    });
  });
};

fn.response = function(response) {
  this._.send(response.title);
}

module.exports = WebSocket;
