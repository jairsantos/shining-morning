var util = require('util');

var Params = function(){
  Object.call(this);
};

util.inherits(Params, Object);

var fn = Params.prototype;

fn.merge = function(object) {
  for (property in object) {
    this[property] = object[property];
  };
}

fn.select = function() {
  var selected = {};
  for(var i = 0; i < arguments.length; i++){
    targetKey           = arguments[i];
    selected[targetKey] = this[targetKey];
  }
  return selected;
}

fn.extract = function() {
  var extracted = {};
  for(var i = 0; i < arguments.length; i++){
    targetKey            = arguments[i];
    extracted[targetKey] = this[targetKey];
    delete this[targetKey];
  }
  return extracted;
}

module.exports = Params;
