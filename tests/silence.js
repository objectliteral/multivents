var assert = require('assert'),
    Channel = require('../multivents.js');

describe('`silence` function', function () {

  it('should return the channel it was called on when called with no arguments', function () {
    var channel = Channel();
    assert.equal(channel, channel.silence());
  });

  it('should return the channel it was called on when called with an event type', function () {
    var channel = Channel();
    assert.equal(channel, channel.silence('ping'));
  });

  it('should disable triggering events of any type if called with no arguments', function () {
    var channel = Channel({});
    channel.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.silence();
    channel.on('pong', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.emit('ping');
    channel.emit('pong');
  });

  it('should disable triggering events of a certain type if called with the event type', function () {
    var channel = Channel({});
    channel.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.on('pong', function () {
      assert(true);
    });
    channel.silence('ping');
    channel.emit('ping');
    channel.emit('pong');
  });

  it('should prevent the specified callback from being triggered if called with the event type and callback function', function () {
    var channel = Channel({}),
      f = function () {
        assert.fail(undefined, undefined, 'This function must not be executed.');
      };
    channel.on('ping', f);
    channel.on('ping', function () {
      assert(true);
    });
    channel.silence('ping', f);
    channel.emit('ping');
  });

  it('should not affect public channels if called with no arguments', function () {
    var channel = Channel('test');
    channel.on('ping', function () {
      assert(true);
    });
    channel.silence();
    channel.emit('ping');
  });

  it('should not affect public channels if called with an event type', function () {
    var channel = Channel('test');
    channel.on('ping', function () {
      assert(true);
    });
    channel.silence('ping');
    channel.emit('ping');
  });

});