var wc = require('..')('word');

var stdin = process.stdin;
var stdout = process.stdout;

stdin.resume();
stdin
  .pipe(wc)
  .pipe(stdout);

