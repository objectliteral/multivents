var assert = require('assert'),
    Channel = require('../multivents.js');

describe('`isSilenced` function', function () {

  it('should return `false` on a public channel when called with no arguments', function () {
    var channel = new Channel('test');
    assert.equal(false, channel.isSilenced());
  });

  it('should return `false` on a public channel when called with no arguments after `silence` was called', function () {
    var channel = new Channel('test');
    channel.silence();
    assert.equal(false, channel.isSilenced());
  });

  it('should return `false` on a public channel when called with an event name that does not exist', function () {
    var channel = new Channel('test');
    assert.equal(false, channel.isSilenced('ping'));
  });

  it('should return `false` on a public channel when called with an event name that does exist', function () {
    var channel = new Channel('test');
    channel.on('ping', function () {});
    assert.equal(false, channel.isSilenced('ping'));
  });

  it('should return `false` on a public channel when called with an event name that does not exist after silence was called', function () {
    var channel = new Channel('test');
    channel.silence();
    assert.equal(false, channel.isSilenced('ping'));
  });

  it('should return `false` on a public channel when called with an event name that does exist after silence was called on the channel', function () {
    var channel = new Channel('test');
    channel.on('ping', function () {});
    channel.silence();
    assert.equal(false, channel.isSilenced('ping'));
  });

  it('should return `false` on a public channel when called with an event name that does exist after silence was called on the event', function () {
    var channel = new Channel('test');
    channel.on('ping', function () {});
    channel.silence('ping');
    assert.equal(false, channel.isSilenced('ping'));
  });

  it('should return `false` on a public channel when called with an event name and callback function that do exist', function () {
    var channel = new Channel('test'),
        f = function () {};
    channel.on('ping', f);
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` on a public channel when called with an event name and callback function that does not exist', function () {
    var channel = new Channel('test'),
        f = function () {};
    channel.on('ping', function () {});
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` on a public channel when called with an event name and callback function that both do not exist', function () {
    var channel = new Channel('test'),
        f = function () {};
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` on a public channel when called with an event name and callback function that do exist after `silence` was called on the channel', function () {
    var channel = new Channel('test'),
        f = function () {};
    channel.on('ping', f);
    channel.silence();
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` on a public channel when called with an event name and callback function that does not exist after `silence` was called on the channel', function () {
    var channel = new Channel('test'),
        f = function () {};
    channel.on('ping', function () {});
    channel.silence();
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` on a public channel when called with an event name and callback function that both do not exist after `silence` was called on the channel', function () {
    var channel = new Channel('test'),
        f = function () {};
        channel.silence();
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` on a public channel when called with an event name and callback function that do exist after `silence` was called on the event', function () {
    var channel = new Channel('test'),
        f = function () {};
    channel.on('ping', f);
    channel.silence('ping');
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` on a public channel when called with an event name and callback function that does not exist after `silence` was called on the event', function () {
    var channel = new Channel('test'),
        f = function () {};
    channel.on('ping', function () {});
    channel.silence('ping');
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` on a public channel when called with an event name and callback function that both do not exist after `silence` was called on the event', function () {
    var channel = new Channel('test'),
        f = function () {};
        channel.silence('ping');
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` on a public channel when called with an event name and callback function that do exist after `silence` was called on the callback function', function () {
    var channel = new Channel('test'),
        f = function () {};
    channel.on('ping', f);
    channel.silence('ping', f);
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` on a public channel when called with an event name and callback function that does not exist after `silence` was called on the callback function', function () {
    var channel = new Channel('test'),
        f = function () {};
    channel.on('ping', function () {});
    channel.silence('ping', f);
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` on a public channel when called with an event name and callback function that both do not exist after `silence` was called on the callback function', function () {
    var channel = new Channel('test'),
        f = function () {};
        channel.silence('ping', f);
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` on a newly created channel when called with no arguments', function () {
    var channel = new Channel();
    assert.equal(false, channel.isSilenced());
  });

  it('should return `true` on a previously silenced channel when called with no arguments', function () {
    var channel = new Channel();
    channel.silence();
    assert.equal(true, channel.isSilenced());
  });

  it('should return `false` on a previously unsilenced channel when called with no arguments', function () {
    var channel = new Channel();
    channel.silence();
    channel.unsilence();
    assert.equal(false, channel.isSilenced());
  });

  it('should return `false` for an event that does not exist when called with an event name', function () {
    var channel = new Channel();
    assert.equal(false, channel.isSilenced('ping'));
  });

  it('should return `false` for an event that was not silenced when called with an event name', function () {
    var channel = new Channel();
    channel.on('ping', function () {});
    assert.equal(false, channel.isSilenced('ping'));
  });

  it('should return `true` on a previously silenced event when called with an event name', function () {
    var channel = new Channel();
    channel.silence('ping');
    assert.equal(true, channel.isSilenced('ping'));
  });

  it('should return `false` on a previously unsilenced event when called with an event name', function () {
    var channel = new Channel();
    channel.silence('ping');
    channel.unsilence('ping');
    assert.equal(false, channel.isSilenced('ping'));
  });

  it('should return `false` when called with a non existing event name and a function', function () {
    var channel = new Channel(),
        f = function () {};
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` when called with an event name and a function that was not registered for that event', function () {
    var channel = new Channel(),
        f = function () {};
    channel.on('ping', function () {});
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `false` for a function that was not silenced when called with an event name and a function', function () {
    var channel = new Channel(),
        f = function () {};
    channel.on('ping', f);
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `true` for a function that was previously silenced when called with an event name and a function', function () {
    var channel = new Channel(),
        f = function () {};
    channel.on('ping', f);
    channel.silence('ping', f);
    assert.equal(true, channel.isSilenced('ping', f));
  });

  it('should return `false` for a function that was previously unsilenced when called with an event name and a function', function () {
    var channel = new Channel(),
        f = function () {};
    channel.on('ping', f);
    channel.silence('ping', f);
    channel.unsilence('ping', f);
    assert.equal(false, channel.isSilenced('ping', f));
  });

  it('should return `true` if the given event is not silenced but the channel is', function () {
    var channel = new Channel();
    channel.silence();
    assert.equal(true, channel.isSilenced('ping'));
  });
  
  it('should return `true` if the given function is not silenced but the channel is', function () {
    var channel = new Channel(),
        f = function () {};
    channel.silence();
    assert.equal(true, channel.isSilenced('ping', f));
  });

  it('should return `true` if the given function is not silenced but the event is', function () {
    var channel = new Channel(),
        f = function () {};
    channel.silence('ping');
    assert.equal(true, channel.isSilenced('ping', f));
  });

});