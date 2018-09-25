var assert = require('assert'),
    Channel = require('../dist/multivents.umd.js');

describe('`reset` function',  function () {
  
  it('should not throw any exceptions when called with no arguments', function () {
    var channel = Channel();
    try {
        channel.reset();
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with the name of an event that does not exist', function () {
    var channel = Channel();
    try {
        channel.reset('ping');
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should return the channel it was called on when called with no arguments', function () {
    var channel = Channel();
    assert.equal(channel, channel.reset());
  });

  it('should return the channel it was called on when called with an event type', function () {
    var channel = Channel();
    assert.equal(channel, channel.reset('ping'));
  });

  it('should remove all callbacks from the channel if called with no arguments', function () {
    var channel = Channel({});
    channel.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.reset();
    channel.emit('ping');
  });

  it('should remove all callbacks from a specific event if called with the event type', function () {
    var channel = Channel({});
    channel.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.on('pong', function () {
      assert(true);
    });
    channel.reset('ping');
    channel.emit('ping');
    channel.emit('pong');
  });

  it('should unlock a locked channel if called with no arguments', function () {
    var channel = Channel();
    channel.lock();
    channel.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.emit('ping');
    channel.reset();
    channel.on('ping', function () {
      assert(true);
    });
    channel.emit('ping');
  });

  it('should unsilence a silenced channel if called with no arguments', function () {
    var channel = Channel();
    channel.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.silence();
    channel.reset();
    channel.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.emit('ping');
  });

  it('should unlock a locked event if called with the event name', function () {
    var channel = Channel();
    channel.lock('ping');
    channel.lock('pong');
    channel.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.on('pong', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.emit('ping');
    channel.emit('pong');
    channel.reset('ping');
    channel.on('ping', function () {
      assert(true);
    });
    channel.on('pong', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.emit('pong');
    channel.emit('ping');
  });

  it('should unsilence a silenced event if called with the event name', function () {
    var channel = Channel();
    channel.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.on('pong', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.silence('ping');
    channel.silence('pong');
    channel.emit('ping');
    channel.emit('pong');
    channel.reset('ping');
    channel.on('ping', function () {
      assert(true);
    });
    channel.on('pong', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.emit('pong')
    channel.emit('ping');
  });

});