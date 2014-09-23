var assert = require('assert'),
    Channel = require('../multivents.js');

describe('`unlock` function', function () {

  it('should return the channel it was called on when called with no arguments', function () {
    var channel = Channel();
    assert.equal(channel, channel.unlock());
  });

  it('should return the channel it was called on when called with event type', function () {
    var channel = Channel();
    assert.equal(channel, channel.unlock('ping'));
  });

  it('should allow new callbacks to be attached to any events if called with no argument', function () {
    var channel = Channel({});
    channel.lock();
    channel.unlock();
    channel.on('ping', function () {
      assert(true);
    });
    channel.emit('ping');
    channel.on('pong', function () {
      assert(true);
    });
    channel.emit('pong');
  });

  it('should allow new callbacks to be attached to any events if called with an event name', function () {
    var channel = Channel({});
    channel.lock('ping');
    channel.lock('pong');
    channel.unlock('ping');
    channel.on('ping', function () {
      assert(true);
    });
    channel.emit('ping');
    channel.on('pong', function () { // this function should not execute as the pong event has been locked
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.emit('pong');
  });

});