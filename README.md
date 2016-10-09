wc-stream
==========
[![Build Status](https://travis-ci.org/cdolan/wc-stream.svg?branch=master)](https://travis-ci.org/cdolan/wc-stream)

Streams implementation of `wc(1)`.

Example
========

```js
const wc = require('wc-stream');

process.stdin
  .pipe(wc())
  .on('data', function (count) {
    console.dir(count);
  })
```

```
$ echo 'foo bar' | node example.js
{ word: 2, line: 1, char: 8 }
```

Usage
======

wc()
-----

Create an object mode Transform stream. See [example](#example) above.

License
========

ISC License.
