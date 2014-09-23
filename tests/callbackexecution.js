var assert = require('assert'),
    Channel = require('../multivents.js');

describe('Callback function execution', function () {

  it('should be synchronous if `on` and `emit` specify that they prefer synchronicity', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { foo = 'bar'; }, null, false);
    channel.emitSync('ping');
    assert.equal('bar', foo);
  });

  it('should be synchronous if `on` specifies that it prefers synchronicity and `emit` has no preference', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { foo = 'bar'; }, this, false);
    channel.emit('ping');
    assert.equal('bar', foo);
  });

  it('should be synchronous if `emit` specifies that it prefers synchronicity and `on` has no preference', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { foo = 'bar'; });
    channel.emitSync('ping');
    assert.equal('bar', foo);
  });

  it('should be asynchronous if `on` and `emit` specify that they prefer asynchronicity', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { assert.equal('bar', foo); }, null, true);
    channel.emitAsync('ping');
    foo = 'bar';
  });

  it('should be asynchronous if `on` specifies that it prefers asynchronicity and `emit` has no preference', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { assert.equal('bar', foo); }, null, true);
    channel.emit('ping');
    foo = 'bar';
  });

  it('should be asynchronous if `emit` specifies that it prefers asynchronicity and `on` has no preference', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { assert.equal('bar', foo); });
    channel.emitAsync('ping');
    foo = 'bar';
  });

  it('should be asynchronous if `on` specifies that it prefers synchronicity and `emit` prefers asynchronicity', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { assert.equal('bar', foo); }, null, true);
    channel.emitAsync('ping');
    foo = 'bar';
  });

  it('should be synchronous if `on` specifies that it prefers asynchronicity and `emit` prefers synchronicity', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { foo = 'bar'; }, null, false);
    channel.emitSync('ping');
    assert.equal('bar', foo);
  });
});