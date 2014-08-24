var assert = require('assert'),
    Events = require('./multivents.js');

describe('Events Constructor', function () {
  it('should return an object containing the methods used by minivents if called with new', function () {
      var channel = new Events();
      assert.equal('object', typeof channel);
  });

  it('should return an object containing the methods used by minivents if called with an empty object', function () {
      var channel = Events({});
      assert.equal('object', typeof channel);
  });

  it('should return an object if called with a string', function () {
      var channel = Events('test');
      assert.equal('object', typeof channel);
  });

  it('should contain a `get` function', function () {
    assert.equal(true, typeof Events.get === 'function');
  });

  it('should make named channels available via a `get` method', function () {
      var channel = Events('test');
      assert.equal(channel, Events.get('test'));
  });

  it('should modify original object that was passed to it', function () {
    var obj = { foo : 'bar' }; 
    eventedObj = Events(obj);
    assert.equal(obj, eventedObj);
  });

});

describe('Event channels', function () {

    it('should contain an `emit` function', function () {
      var channel = Events({});
      assert.equal('function', typeof channel.emit);
    });

    it('should contain an `emitSync` function', function () {
      var channel = Events({});
      assert.equal('function', typeof channel.emitSync);
    });

    it('should contain an `emitAsync` function', function () {
      var channel = Events({});
      assert.equal('function', typeof channel.emitAsync);
    });

    it('should contain an `off` function', function () {
      var channel = Events({});
      assert.equal('function', typeof channel.off);
    });

    it('should contain an `on` function', function () {
      var channel = Events({});
      assert.equal('function', typeof channel.on);
    });
    
    it('should contain an `reset` function', function () {
      var channel = Events({});
      assert.equal('function', typeof channel.reset);
    });

    it('should contain an `silence` function', function () {
      var channel = Events({});
      assert.equal('function', typeof channel.silence);
    });
    
    it('should contain an `unsilence` function', function () {
      var channel = Events({});
      assert.equal('function', typeof channel.unsilence);
    });

    it('should contain an `lock` function', function () {
      var channel = Events({});
      assert.equal('function', typeof channel.lock);
    });
    
    it('should contain an `unlock` function', function () {
      var channel = Events({});
      assert.equal('function', typeof channel.unlock);
    });
    
    it('should contain a `trigger` alias for the `emit` function', function () {
      var channel = Events({});
      assert.equal(channel.emit, channel.trigger);
    });

    it('should contain a `triggerSync` alias for the `emitSync` function', function () {
      var channel = Events({});
      assert.equal(channel.emitSync, channel.triggerSync);
    });

    it('should contain a `triggerAsync` alias for the `emitAsync` function', function () {
      var channel = Events({});
      assert.equal(channel.emitAsync, channel.triggerAsync);
    });

    it('should contain a `fire` alias for the `emit` function', function () {
      var channel = Events({});
      assert.equal(channel.emit, channel.fire);
    });

    it('should contain a `fireSync` alias for the `emitSync` function', function () {
      var channel = Events({});
      assert.equal(channel.emitSync, channel.fireSync);
    });

    it('should contain a `fireAsync` alias for the `emitAsync` function', function () {
      var channel = Events({});
      assert.equal(channel.emitAsync, channel.fireAsync);
    });

    it('should contain a `attach` alias for the `on` function', function () {
      var channel = Events({});
      assert.equal(channel.emit, channel.fire);
    });

    it('should contain a `detach` alias for the `off` function', function () {
      var channel = Events({});
      assert.equal(channel.emit, channel.fire);
    });

});

describe('`on` function', function () {
  
  it('should not throw any exceptions when called with a string and a function', function () {
    var channel = Events({});
    try {
        channel.on('ping', function () { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with a string, a function and an object', function () {
    var channel = Events({});
    try {
        channel.on('ping', function () { }, { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

});

describe('`off` function', function () {
  
  it('should not throw any exceptions when called with a string and a function', function () {
    var channel = Events({}),
        f = function () { };
    channel.on('ping', f);
    try {
        channel.off('ping', f);
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with a function that is not registered as a callback for the specified event', function () {
    var channel = Events({});
    channel.on('ping', function () { });
    try {
        channel.off('ping', function () { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with the name of an event that does not exist', function () {
    var channel = Events({}),
        f = function () { };
    channel.on('ping', f);
    try {
        channel.off('pong', f);
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should result in the given callback no longer being triggered', function () {
    var channel = Events({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); };
    channel.on('ping', f);
    channel.off('ping', f);
    channel.emit('ping');
  });

});

describe('`emit` function',  function () {
    it('should result in registered callbacks being invoked',  function () {
        var channel = Events({}),
            f = function () { assert(true); };
        channel.on('ping', f);
        channel.emit('ping');
    });

    it('should pass all of its additional arguments to the callback',  function () {
        var channel = Events({}),
            f = function (arg0, arg1) { 
              assert.equal('foo', arg0);
              assert.equal('bar', arg1);
            };
        channel.on('ping', f);
        channel.emit('ping', 'foo', 'bar');
    });

    it('should pass all of its additional arguments to the callback when explicitly called with the async flag',  function () {
        var channel = Events({}),
            f = function (arg0, arg1) { 
              assert.equal('foo', arg0);
              assert.equal('bar', arg1);
            };
        channel.on('ping', f);
        channel.emitAsync('ping', 'foo', 'bar');
    });

    it('should pass all of its additional arguments to the callback when explicitly called with the sync flag',  function () {
        var channel = Events({}),
            f = function (arg0, arg1) { 
              assert.equal('foo', arg0);
              assert.equal('bar', arg1);
            };
        channel.on('ping', f);
        channel.emitSync('ping', 'foo', 'bar');
    });

    it('should inject a callback\'s context',  function () {
        var channel = Events({}),
            ctx = { }
            f = function () { assert.equal(ctx, this); };
        channel.on('ping', f, ctx);
        channel.emit('ping');
    });

    it('should inject a callback\'s context when explicitly called with the async flag',  function () {
        var channel = Events({}),
            ctx = { }
            f = function () { assert.equal(ctx, this); };
        channel.on('ping', f, ctx);
        channel.emitAsync('ping');
    });

    it('should inject a callback\'s context when explicitly called with the sync flag',  function () {
        var channel = Events({}),
            ctx = { }
            f = function () { assert.equal(ctx, this); };
        channel.on('ping', f, ctx);
        channel.emitSync('ping');
    });

    it('should inject an event object containing information about the event', function () {
        var channel = Events({}),
            f = function (arg, evt) {
                assert.equal('object', typeof evt);
                assert.equal(f, evt.func);
                assert.equal(undefined, evt.context);
                assert.equal('ping', evt.name);
                assert.equal(channel, evt.channel);
                // assert.equal(true, evt.async);
                //assert.equal(data, evt.data);
            };
        channel.on('ping', f);
        channel.emit('ping', 'foo');
    });

    it('should inject an event object containing information about the event when explicitly called with the async flag', function () {
        var channel = Events({}),
            f = function (arg, evt) {
                assert.equal('object', typeof evt);
            };
        channel.on('ping', f);
        channel.emitAsync('ping', 'foo');
    });

    it('should inject an event object containing information about the event when explicitly called with the sync flag', function () {
        var channel = Events({}),
            f = function (arg, evt) {
                assert.equal('object', typeof evt);
            };
        channel.on('ping', f);
        channel.emitSync('ping', 'foo');
    });
});

describe('the event object, passed to callback functions', function () {

  it('should contain a reference to the callback function', function () {
    var channel = Events({}),
        f = function (evt) {
            assert.equal(f, evt.func);
        };
    channel.on('ping', f);
    channel.emit('ping');
  });

  it('should contain a reference to the context object that was declared for the callback function', function () {
    var channel = Events({}),
        ctx = {},
        f = function (evt) {
            assert.equal(ctx, evt.context);
        };
    channel.on('ping', f, ctx);
    channel.emit('ping');
  });

  it('should contain the event name', function () {
    var channel = Events({}),
        f = function (evt) {
            assert.equal('ping', evt.name);
        };
    channel.on('ping', f);
    channel.emit('ping');
  });

  it('should contain a reference to the event channel on which the event was triggered', function () {
    var channel = Events({}),
        f = function (evt) {
            assert.equal(channel, evt.channel);
        };
    channel.on('ping', f);
    channel.emit('ping');
  });

  it('should contain information about whether the callback was executed asynchronously', function () {
    var channel = Events({}),
        f = function (evt) {
            assert.equal(true, evt.async);
        };
    channel.on('ping', f);
    channel.emit('ping');
  });

});

describe('`reset` function',  function () {
  
  it('should remove all callbacks from the channel if called with no arguments', function () {
    var channel = Events({});
    channel.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    channel.reset();
    channel.emit('ping');
  });

  it('should remove all callbacks from a specific event if called with the event type', function () {
    var channel = Events({});
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

  it('should not affect public channels', function () {
    var channel = Events('test');
    channel.on('ping', function () {
      assert(true);
    });
    channel.reset();
    channel.emit('ping');
  });

  it('should unlock a locked channel if called with no arguments', function () {
    var channel = Events();
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
    var channel = Events();
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
    var channel = Events();
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
    var channel = Events();
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

describe('`silence` function', function () {
  it('should disable triggering events of any type if called with no arguments', function () {
    var channel = Events({});
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
    var channel = Events({});
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
    var channel = Events({}),
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
    var channel = Events('test');
    channel.on('ping', function () {
      assert(true);
    });
    channel.silence();
    channel.emit('ping');
  });

  it('should not affect public channels if called with an event type', function () {
    var channel = Events('test');
    channel.on('ping', function () {
      assert(true);
    });
    channel.silence('ping');
    channel.emit('ping');
  });
});

describe('`unsilence` function', function () {
  it('should re-enable triggering messages on a channel if called with no arguments', function () {
    var channel = Events({});
    channel.on('ping', function () {
      assert(true);
    });
    channel.silence();
    channel.unsilence();
    channel.emit('ping');
  });

  it('should re-enable triggering messages of a certain type if called with the event type', function () {
    var channel = Events({});
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
    var channel = Events({}),
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

describe('`lock` function', function () {

  it('should prevent new callbacks from being attach to any events if called with no argument', function () {
    var channel = Events({});
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
    var channel = Events({});
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
    var channel = Events('test');
    channel.lock();
    channel.on('ping', function () {
      assert(true);
    });
    channel.emit('ping');
  });

  it('should not affect public channels if called with an event name', function () {
    var channel = Events('test');
    channel.on('ping', function () {});
    channel.lock('ping');
    channel.on('ping', function () {
      assert(true);
    });
    channel.emit('ping');
  });

});

describe('`unlock` function', function () {

  it('should allow new callbacks to be attached to any events if called with no argument', function () {
    var channel = Events({});
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
    var channel = Events({});
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

describe('Callback function execution', function () {

  it('should be synchronous if `on` and `emit` specify that they prefer synchronicity', function () {
    var channel = Events({}),
        foo;
    channel.on('ping', function () { foo = 'bar'; }, null, false);
    channel.emitSync('ping');
    assert.equal('bar', foo);
  });

  it('should be synchronous if `on` specifies that it prefers synchronicity and `emit` has no preference', function () {
    var channel = Events({}),
        foo;
    channel.on('ping', function () { foo = 'bar'; }, this, false);
    channel.emit('ping');
    assert.equal('bar', foo);
  });

  it('should be synchronous if `emit` specifies that it prefers synchronicity and `on` has no preference', function () {
    var channel = Events({}),
        foo;
    channel.on('ping', function () { foo = 'bar'; });
    channel.emitSync('ping');
    assert.equal('bar', foo);
  });

  it('should be asynchronous if `on` and `emit` specify that they prefer asynchronicity', function () {
    var channel = Events({}),
        foo;
    channel.on('ping', function () { assert.equal('bar', foo); }, null, true);
    channel.emitAsync('ping');
    foo = 'bar';
  });

  it('should be asynchronous if `on` specifies that it prefers asynchronicity and `emit` has no preference', function () {
    var channel = Events({}),
        foo;
    channel.on('ping', function () { assert.equal('bar', foo); }, null, true);
    channel.emit('ping');
    foo = 'bar';
  });

  it('should be asynchronous if `emit` specifies that it prefers asynchronicity and `on` has no preference', function () {
    var channel = Events({}),
        foo;
    channel.on('ping', function () { assert.equal('bar', foo); });
    channel.emitAsync('ping');
    foo = 'bar';
  });

  it('should be asynchronous if `on` specifies that it prefers synchronicity and `emit` prefers asynchronicity', function () {
    var channel = Events({}),
        foo;
    channel.on('ping', function () { assert.equal('bar', foo); }, null, true);
    channel.emitAsync('ping');
    foo = 'bar';
  });

  it('should be synchronous if `on` specifies that it prefers asynchronicity and `emit` prefers synchronicity', function () {
    var channel = Events({}),
        foo;
    channel.on('ping', function () { foo = 'bar'; }, null, false);
    channel.emitSync('ping');
    assert.equal('bar', foo);
  });
});