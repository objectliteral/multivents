var assert = require('assert'),
    Channel = require('../dist/multivents.umd.js');

describe('`silence` function', function () {

  it('should return the channel it was called on when called with no arguments', function () {
    var channel = Channel();
    assert.equal(channel, channel.silence());
  });

  it('should return the channel it was called on when called with an event type that does exist', function () {
    var channel = Channel();
    channel.on('ping', function () {});
    assert.equal(channel, channel.silence('ping'));
  });

  it('should return the channel it was called on when called with an event type that does not exist', function () {
    var channel = Channel();
    assert.equal(channel, channel.silence('ping'));
  });

  it('should return the channel it was called on when called with an event type and a callback function that do exist', function () {
    var channel = Channel(),
        f = function () {};
    channel.on('ping', f);
    assert.equal(channel, channel.silence('ping', f));
  });

  it('should return the channel it was called on when called with an event type and a callback function that does not exist', function () {
    var channel = Channel(),
        f = function () {};
    channel.on('ping', function () {});
    assert.equal(channel, channel.silence('ping', f));
  });

  it('should return the channel it was called on when called with an event type and a callback function that both do not exist', function () {
    var channel = Channel(),
        f = function () {};
    assert.equal(channel, channel.silence('ping', f));
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

  it('should disable triggering events of a certain type if called with a new event type, even when a callback for that event was added after silence was called', function () {
    var channel = Channel({});
    channel.on('pong', function () {
      assert(true);
    });
    channel.silence('ping');
    channel.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.emit('ping');
    channel.emit('pong');
  });

  it('should disable triggering events of a certain type if called with an already existing event type, even when a callback for that event was added after silence was called', function () {
    var channel = Channel({});
    channel.on('pong', function () {
      assert(true);
    });
    channel.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.silence('ping');
    channel.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
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

});