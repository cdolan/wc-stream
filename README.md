wc-stream
=========

Streaming implementation of Unix's wc, written in pure JavaScript

## Installation

    $ npm install wc-stream

##Example
```javascript
var fs = require('fs')
  , wc = require('wc-stream');

var lineCount = wc('line');

fs.createReadStream('./example.txt')
  .pipe(lineCount)
  .pipe(process.stdout);
```

## Usage

### wc(quant)

Count streamed input by `quant`, either 'char', 'line', or 'word'.

## License
The MIT License