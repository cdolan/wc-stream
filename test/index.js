const expect = require('chai').expect
    , stream = require('stream')
    , wc = require('../');

describe('#wc()', function () {
  let count = {};

  describe('when stream is blank', function () {
    before(function (done) {
      let s = streamify('');

      s.pipe(wc()).on('data', function (data) {
        count = data;
        done();
      });
    });

    it('counts words', function () {
      expect(count['word']).to.equal(0);
    });

    it('counts lines', function () {
      expect(count['line']).to.equal(1);
    });

    it('counts characters', function () {
      expect(count['char']).to.equal(1);
    });
  });

  describe('when stream is not blank', function () {
    before(function (done) {
      let s = streamify('foo bar baz\nspam\neggs');

      s.pipe(wc()).on('data', function (data) {
        count = data;
        done();
      });
    });

    it('counts words', function () {
      expect(count['word']).to.equal(5);
    });

    it('counts lines', function () {
      expect(count['line']).to.equal(3);
    });

    it('counts characters', function () {
      expect(count['char']).to.equal(22);
    });
  });
});

function streamify(str) {
  let s = new stream.Readable();

  s._read = function () {
    this.push(str);
    this.push(null);
  };

  return s;
}
