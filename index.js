var stream = require('stream')
  , util = require('util');

var WCStream = function(quant) {
  switch (quant) {
    case 'char':
    case 'word':
    case 'line':
      this.quant = quant;
      break;
    default:
      throw new Error('Quantifier must be specified');
  }

  this.count = 0;
  this.space = true;
  this.readable = true;
  this.writable = true;
};

util.inherits(WCStream, stream.Stream);

WCStream.prototype.write = function(data) {
  switch (this.quant) {
    case 'char':
      this.count += data.length;
      break;
    case 'word':
      var str = data.toString();
      for (var i = 0; i < str.length; i++) {
        if (isspace(str[i])) {
          this.space = true;
        } else {
          if (this.space) {
            this.space = false;
            this.count++;;
          }
        }
      }
      break;
    case 'line':
      var str = data.toString();
      for (var i = 0; i < str.length; i++) {
        if (str[i] === '\n') {
          this.count++;
        }
      }
      break;
  }
};

WCStream.prototype.end = function(data) {
  if (data) {
    this.write(data);
  }

  this.emit('data', this.count.toString());
  this.emit('end');

  this.count = 0;
  this.space = true;
};

function isspace(c) {
  return c === ' ' ||
         c === '\t' ||
         c === '\n' ||
         c === '\v' ||
         c === '\f' ||
         c === '\r';
}

exports = module.exports = function(quant) {
  return new WCStream(quant);
};

exports.WCStream = WCStream;
