var assert = require('assert'),
    Channel = require('../multivents.js');

describe('`once` method', function () {

  it('should register an event callback that gets executed only once', function () {

    var channel = new Channel(),
      check = 0;

    channel.once('test', function () {
      check++;
    });

    channel.emitSync('test');

    assert.equal(1, check);

    channel.emitSync('test');

    assert.equal(1, check);

  });

  it('should preserve all arguments being passed to the callback', function () {

    var channel = new Channel(),
      check,
      obj = {};

    channel.once('test', function (o) {
      check = o;
    });

    channel.emitSync('test', obj);

    assert.equal(obj, check);

  });

  it('should preserve the injected context', function () {

    var channel = new Channel(),
      check,
      obj = {};

    channel.once('test', function () {
      check = this;
    }, obj);

    channel.emitSync('test');

    assert.equal(obj, check);

  });

});