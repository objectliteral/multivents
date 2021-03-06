var assert = require('assert'),
    Channel = require('../dist/multivents.umd.js');

describe('`off` function', function () {
  
  it('should not throw any exceptions when called with a string and a function', function () {
    var channel = Channel({}),
        f = function () { };
    channel.on('ping', f);
    try {
        channel.off('ping', f);
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with a function that is not registered as a callback for the specified event', function () {
    var channel = Channel({});
    channel.on('ping', function () { });
    try {
        channel.off('ping', function () { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with the name of an event that does not exist', function () {
    var channel = Channel({}),
        f = function () { };
    channel.on('ping', f);
    try {
        channel.off('pong', f);
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with the name of an event that does not exist', function () {
    var channel = Channel();
    try {
        channel.off('ping');
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with an event name and a function that was not registered for that event', function () {
    var channel = Channel();
    channel.on('ping', function () {});
    try {
        channel.off('ping', function () { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should return the channel it was called on when called with an event name and a function', function () {
    var channel = Channel();
    assert.equal(channel, channel.off('ping', function () {}));
  });

  it('should return the channel it was called on when called with an event name', function () {
    var channel = Channel();
    assert.equal(channel, channel.off('ping'));
  });

  it('should return the channel it was called on when called with no arguments', function () {
    var channel = Channel();
    assert.equal(channel, channel.off());
  });

  it('should result in the given callback no longer being triggered when called with an event type and a function reference', function () {
    var channel = Channel({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); };
    channel.on('ping', f);
    channel.off('ping', f);
    channel.emit('ping');
  });

  it('should result in all instances of the given callback no longer being triggered when called with an event type and a function reference', function () {
    var channel = Channel({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); };
    channel.on('asdasd', f);
    channel.on('asdasd', f);
    channel.off('asdasd', f);
    channel.emitSync('asdasd');
  });

  it('should result in callbacks for the given type no longer being triggered if called with an event type', function () {
    var channel = Channel({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); },
        f2 = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); };
    channel.on('ping', f);
    channel.on('ping', f2);
    channel.off('ping');
    channel.emitSync('ping');
  });

  it('should result in no more callbacks being triggered if called with no arguments', function () {
    var channel = Channel({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); },
        f2 = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); };
    channel.on('ping', f);
    channel.on('pong', f2);
    channel.off();
    channel.emitSync('ping');
    channel.emitSync('pong');
  });

  it('should not affect any other function except for the given one when called with an event type and a function reference', function () {
    var channel = Channel({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); },
        f2 = function () { assert(true); };
    channel.on('ping', f);
    channel.on('ping', f2);
    channel.off('ping', f);
    channel.emitSync('ping');
  });

  it('should not affect any other function except for the given one when called with an event type and a function reference (2)', function () {
    var channel = Channel({}),
        f = function () { test = true; },
        f2 = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); },
        test = false;
    channel.on('ping', f);
    channel.on('ping', f2);
    channel.off('ping', f2);
    channel.emitSync('ping');
    assert(true, test);
  });

  it('should not affect any other function except for the given one when called with an event type and a function reference (3)', function () {
    var channel = Channel({}),
        f1 = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); },
        f2 = function () { test1 = true; },
        f3 = function () { test2 = true; },
        test1 = false,
        test2 = false;
    channel.on('ping', f1);
    channel.on('ping', f2);
    channel.on('ping', f3);
    channel.off('ping', f1);
    channel.emitSync('ping');
    assert.equal(true, test1);
    assert.equal(true, test2);
  });

  it('should not affect any other events other than the given on if called with an event type', function () {
    var channel = Channel({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); },
        f2 = function () { assert(true); };
    channel.on('ping', f);
    channel.on('pong', f2);
    channel.off('ping');
    channel.emitSync('ping');
    channel.emitSync('pong');
  });

  it('should not affect any other channels other than the given one if called with no arguments', function () {
    var channel = Channel({}),
        channel2 = Channel({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); },
        f2 = function () { assert(true); };
    channel.on('ping', f);
    channel2.on('ping', f2);
    channel.off();
    channel.emitSync('ping');
    channel2.emitSync('ping');
  });

  it('should not affect locked events when called with an event type and a function reference', function () {
    var channel = Channel({}),
        res = false,
        f = function () { res = true};
    channel.on('ping', f);
    channel.lock('ping');
    channel.off('ping', f);
    channel.emitSync('ping');
    assert.equal(true, res);
  });

   it('should not affect events on locked channels when called with an event type and a function reference', function () {
    var channel = Channel({}),
        res = false,
        f = function () { res = true};
    channel.on('ping', f);
    channel.lock();
    channel.off('ping', f);
    channel.emitSync('ping');
    assert.equal(true, res);
  });

   it('should not affect locked events when called with an event type', function () {
    var channel = Channel({}),
        res = false,
        f = function () { res = true};
    channel.on('ping', f);
    channel.lock('ping');
    channel.off('ping');
    channel.emitSync('ping');
    assert.equal(true, res);
  });

   it('should not affect events on locked channels when called with an event type', function () {
    var channel = Channel({}),
        res = false,
        f = function () { res = true};
    channel.on('ping', f);
    channel.lock();
    channel.off('ping');
    channel.emitSync('ping');
    assert.equal(true, res);
  });

   it('should not affect locked channels when called with no arguments', function () {
    var channel = Channel({}),
        res = false,
        f = function () { res = true};
    channel.on('ping', f);
    channel.lock();
    channel.off();
    channel.emitSync('ping');
    assert.equal(true, res);
  });

});