var assert = require('assert'),
    Channel = require('../dist/multivents.umd.js');

describe('`on` function', function () {
  
  it('should not throw any exceptions when called with an event name and a function', function () {
    var channel = Channel({});
    try {
        channel.on('ping', function () { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with an already existing event name and a function', function () {
    var channel = Channel({});
    channel.on('ping', function () { });
    try {
        channel.on('ping', function () { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with an event name, a function and a context object', function () {
    var channel = Channel({});
    try {
        channel.on('ping', function () { }, { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with an already existing event name, a function and a context object', function () {
    var channel = Channel({});
    channel.on('ping', function () {});
    try {
        channel.on('ping', function () { }, { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should return the channel it was called on when called with two arguments', function () {
    var channel = Channel();
    assert.equal(channel, channel.on('ping', function () {}));
  });

  it('should return the channel it was called on when called with three arguments', function () {
    var channel = Channel();
    assert.equal(channel, channel.on('ping', function () {}, this));
  });

  it('should return the channel it was called on when called with four arguments', function () {
    var channel = Channel();
    assert.equal(channel, channel.on('ping', function () {}, this, true));
  });

  it('should preserve the injected context', function () {

    var channel = new Channel(),
      check,
      obj = {};

    channel.on('test', function () {
      check = this;
    }.bind(obj));

    channel.emitSync('test');

    assert.equal(obj, check);

  });

  it('should not register callbacks for event types that do not match a certain naming pattern', function () {

    var channel = new Channel(),
      check = true;

    channel.on('1twothree', function () {
      check = false;
    });

    channel.emitSync('*');

    assert.equal(check, true);

  });

  it('should not register callbacks for event types that do not match a certain naming pattern', function () {

    var channel = new Channel(),
      check = true;

    channel.on('123', function () {
      check = false;
    });

    channel.emitSync('*');

    assert.equal(check, true);

  });

  it('should not register callbacks for event types that do not match a certain naming pattern', function () {

    var channel = new Channel(),
      check = true;

    channel.on('asd!', function () {
      check = false;
    });

    channel.emitSync('*');

    assert.equal(check, true);

  });

  it('should not register callbacks for event types that do not match a certain naming pattern', function () {

    var channel = new Channel(),
      check = true;

    channel.on('##', function () {
      check = false;
    });

    channel.emitSync('*');

    assert.equal(check, true);

  });

});