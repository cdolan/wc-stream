const Transform = require('stream').Transform;

class WordCount extends Transform {
  constructor() {
    super({ readableObjectMode: true });

    this._chars = 1;
    this._lines = 1;
    this._words = 0;
  }

  _transform(chunk, encoding, callback) {
    const data = chunk.toString();

    this._countChars(data);
    this._countLines(data);
    this._countWords(data);

    callback();
  }

  _flush(callback) {
    this.push({ word: this._words, line: this._lines, char: this._chars });
    callback();
  }

  _countChars(data) {
    this._chars += data.length;
  }

  _countLines(data) {
    for (let char of data) {
      if (char === '\n')
        this._lines++;
    }
  }

  _countWords(data) {
    let inWord = false;
    let isWhitespace = (c) => { return c === ' ' || c === '\n' }

    for (let char of data) {
      if (!isWhitespace(char)) {
        if (!inWord)
          this._words++;

        inWord = true;
      } else {
        inWord = false;
      }
    }
  }
}

module.exports = function () {
  return new WordCount();
}
