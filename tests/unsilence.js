var assert = require('assert'),
    Channel = require('../multivents.js');

describe('`unsilence` function', function () {

  it('should return the channel it was called on when called with no arguments', function () {
    var channel = Channel();
    assert.equal(channel, channel.unsilence());
  });

  it('should return the channel it was called on when called with an event type', function () {
    var channel = Channel();
    assert.equal(channel, channel.unsilence('ping'));
  });

  it('should return the channel it was called on when called with an event type and a callback function', function () {
    var channel = Channel(),
        f = function () {};
    channel.on('ping', f);
    assert.equal(channel, channel.unsilence('ping', f));
  });

  it('should re-enable triggering messages on a channel if called with no arguments', function () {
    var channel = Channel({});
    channel.on('ping', function () {
      assert(true);
    });
    channel.silence();
    channel.unsilence();
    channel.emit('ping');
  });

  it('should re-enable triggering messages of a certain type if called with the event type', function () {
    var channel = Channel({});
    channel.on('ping', function () {
      assert(true);
    });
    channel.on('pong', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.silence('ping');
    channel.silence('pong');
    channel.unsilence('ping');
    channel.emit('ping');
  });

  it('should re-enable the specified callback if called with the event type and callback function', function () {
    var channel = Channel({}),
      f0 = function () {
        assert(true);
      },
      f1 = function () {
        assert.fail(undefined, undefined, 'This function must not be executed.');
      };
    channel.on('ping', f0);
    channel.on('ping', f1);
    channel.silence('ping', f0);
    channel.silence('ping', f1);
    channel.unsilence('ping', f0);
    channel.emit('ping');
  });

});