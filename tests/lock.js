var assert = require('assert'),
    Channel = require('../multivents.js');

describe('`lock` function', function () {

  it('should return the channel it was called on when called with no arguments', function () {
    var channel = Channel();
    assert.equal(channel, channel.lock());
  });

  it('should return the channel it was called on when called with event type', function () {
    var channel = Channel();
    assert.equal(channel, channel.lock('ping'));
  });

  it('should prevent new callbacks from being attach to any events if called with no argument', function () {
    var channel = Channel({});
    channel.on('ping', function () { // this function should still be executed
      assert(true);
    });
    channel.lock();
    channel.on('ping', function () { // this function should not be executed
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.emit('ping');
    channel.on('pong', function () { // and this function should not be executed either
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.emit('pong');
  });

  it('should prevent new callbacks from being attach to any events if called with an event name', function () {
    var channel = Channel({});
    channel.on('ping', function () { // this function should still be executed
      assert(true);
    });
    channel.lock('ping');
    channel.on('ping', function () { // this function should not be executed
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.emit('ping');
    channel.on('pong', function () { // this function should be executed as it belongs to a different (unlocked) event
      assert(true);
    });
    channel.emit('pong');
  });

  it('should not affect public channels if called with no argument', function () {
    var channel = Channel('test');
    channel.lock();
    channel.on('ping', function () {
      assert(true);
    });
    channel.emit('ping');
  });

  it('should not affect public channels if called with an event name', function () {
    var channel = Channel('test');
    channel.on('ping', function () {});
    channel.lock('ping');
    channel.on('ping', function () {
      assert(true);
    });
    channel.emit('ping');
  });

});