var WebsocketServer = require('ws').Server
  , websocketConf   = require('../../config/websocket')
  , util            = require('util')
  , events          = require('events')
  ;

var WebSocket = function(){
  this.wss = new WebsocketServer(websocketConf);
  this.msg;
  events.EventEmitter.call(this);
};

util.inherits(WebSocket, events.EventEmitter);

var fn = WebSocket.prototype;

fn.start   = function(){
  var self = this;

  // Treat other events after
  this.wss.on('connection', function(ws) {
    ws.on('message', function(message) {
      self.emit('request:start', message);
      self.msg = this;
    });
  });
};

fn.response = function(response) {
  this.msg.send(response);
}

module.exports = WebSocket;
