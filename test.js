var assert = require('assert'),
    Channel = require('./multivents.js');

describe('Channel Constructor', function () {
  it('should return an object containing the methods used by minivents if called with new', function () {
      var channel = new Channel();
      assert.equal('object', typeof channel);
  });

  it('should return an object containing the methods used by minivents if called with an empty object', function () {
      var channel = Channel({});
      assert.equal('object', typeof channel);
  });

  it('should return an object if called with a string', function () {
      var channel = Channel('test');
      assert.equal('object', typeof channel);
  });

  it('should contain a `get` function', function () {
    assert.equal(true, typeof Channel.get === 'function');
  });

  it('should make named channels available via a `get` method', function () {
      var channel = Channel('test');
      assert.equal(channel, Channel.get('test'));
  });

  it('should modify original object that was passed to it', function () {
    var obj = { foo : 'bar' }; 
    eventedObj = Channel(obj);
    assert.equal(obj, eventedObj);
  });

});

describe('Event channels', function () {

    it('should contain an `emit` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.emit);
    });

    it('should contain an `emitSync` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.emitSync);
    });

    it('should contain an `emitAsync` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.emitAsync);
    });

    it('should contain an `off` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.off);
    });

    it('should contain an `on` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.on);
    });
    
    it('should contain a `reset` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.reset);
    });

    it('should contain a `silence` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.silence);
    });
    
    it('should contain an `unsilence` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.unsilence);
    });

    it('should contain a `lock` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.lock);
    });
    
    it('should contain an `unlock` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.unlock);
    });
    
    it('should contain a `trigger` alias for the `emit` function', function () {
      var channel = Channel({});
      assert.equal(channel.emit, channel.trigger);
    });

    it('should contain a `triggerSync` alias for the `emitSync` function', function () {
      var channel = Channel({});
      assert.equal(channel.emitSync, channel.triggerSync);
    });

    it('should contain a `triggerAsync` alias for the `emitAsync` function', function () {
      var channel = Channel({});
      assert.equal(channel.emitAsync, channel.triggerAsync);
    });

    it('should contain a `fire` alias for the `emit` function', function () {
      var channel = Channel({});
      assert.equal(channel.emit, channel.fire);
    });

    it('should contain a `fireSync` alias for the `emitSync` function', function () {
      var channel = Channel({});
      assert.equal(channel.emitSync, channel.fireSync);
    });

    it('should contain a `fireAsync` alias for the `emitAsync` function', function () {
      var channel = Channel({});
      assert.equal(channel.emitAsync, channel.fireAsync);
    });

    it('should contain a `publish` alias for the `emit` function', function () {
      var channel = Channel({});
      assert.equal(channel.emit, channel.publish);
    });

    it('should contain a `publishSync` alias for the `emitSync` function', function () {
      var channel = Channel({});
      assert.equal(channel.emitSync, channel.publishSync);
    });

    it('should contain a `publishAsync` alias for the `emitAsync` function', function () {
      var channel = Channel({});
      assert.equal(channel.emitAsync, channel.publishAsync);
    });

    it('should contain an `attach` alias for the `on` function', function () {
      var channel = Channel({});
      assert.equal(channel.on, channel.attach);
    });

    it('should contain an `subscribe` alias for the `on` function', function () {
      var channel = Channel({});
      assert.equal(channel.on, channel.subscribe);
    });

    it('should contain a `detach` alias for the `off` function', function () {
      var channel = Channel({});
      assert.equal(channel.off, channel.detach);
    });

    it('should contain a `unsubscribe` alias for the `off` function', function () {
      var channel = Channel({});
      assert.equal(channel.off, channel.unsubscribe);
    });

    it('should contain an `isSilenced` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.isSilenced);
    });

    it('should contain an `isLocked` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.isLocked);
    });

    it('should contain a `restrict` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.restrict);
    });

});

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

});

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

  it('should result in callbacks for the given type no longer being triggered if called with an event type', function () {
    var channel = Channel({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); },
        f2 = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); };
    channel.on('ping', f);
    channel.on('ping', f2);
    channel.off('ping');
    channel.emit('ping');
  });

  it('should result in no more callbacks being triggered if called with no arguments', function () {
    var channel = Channel({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); },
        f2 = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); };
    channel.on('ping', f);
    channel.on('pong', f2);
    channel.off();
    channel.emit('ping');
    channel.emit('pong');
  });

  it('should not affect any other function except for the given one when called with an event type and a function reference', function () {
    var channel = Channel({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); },
        f2 = function () { assert(true); };
    channel.on('ping', f);
    channel.on('ping', f2);
    channel.off('ping', f);
    channel.emit('ping');
  });

  it('should not affect any other events other than the given on if called with an event type', function () {
    var channel = Channel({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); },
        f2 = function () { assert(true); };
    channel.on('ping', f);
    channel.on('pong', f2);
    channel.off('ping');
    channel.emit('ping');
    channel.emit('pong');
  });

  it('should not affect any other channels other than the given one if called with no arguments', function () {
    var channel = Channel({}),
        channel2 = Channel({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); },
        f2 = function () { assert(true); };
    channel.on('ping', f);
    channel2.on('ping', f2);
    channel.off();
    channel.emit('ping');
    channel2.emit('ping');
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

describe('`emit` function',  function () {

    it('should return the channel it was called on when called with one arguments', function () {
      var channel = Channel();
      assert.equal(channel, channel.emit('ping'));
    });

    it('should result in registered callbacks being invoked',  function () {
        var channel = Channel({}),
            f = function () { assert(true); };
        channel.on('ping', f);
        channel.emit('ping');
    });

    it('should not throw any exceptions when called with the name of an event that does not exist', function () {
      var channel = Channel();
      try {
          channel.emit('ping');
      } catch (e) {
          assert.fail(undefined, e, e.toString());
      }
    });

    it('should pass all of its additional arguments to the callback',  function () {
        var channel = Channel({}),
            f = function (arg0, arg1) { 
              assert.equal('foo', arg0);
              assert.equal('bar', arg1);
            };
        channel.on('ping', f);
        channel.emit('ping', 'foo', 'bar');
    });

    it('should pass all of its additional arguments to the callback when explicitly called with the async flag',  function () {
        var channel = Channel({}),
            f = function (arg0, arg1) { 
              assert.equal('foo', arg0);
              assert.equal('bar', arg1);
            };
        channel.on('ping', f);
        channel.emitAsync('ping', 'foo', 'bar');
    });

    it('should pass all of its additional arguments to the callback when explicitly called with the sync flag',  function () {
        var channel = Channel({}),
            f = function (arg0, arg1) { 
              assert.equal('foo', arg0);
              assert.equal('bar', arg1);
            };
        channel.on('ping', f);
        channel.emitSync('ping', 'foo', 'bar');
    });

    it('should inject a callback\'s context',  function () {
        var channel = Channel({}),
            ctx = { }
            f = function () { assert.equal(ctx, this); };
        channel.on('ping', f, ctx);
        channel.emit('ping');
    });

    it('should inject a callback\'s context when explicitly called with the async flag',  function () {
        var channel = Channel({}),
            ctx = { }
            f = function () { assert.equal(ctx, this); };
        channel.on('ping', f, ctx);
        channel.emitAsync('ping');
    });

    it('should inject a callback\'s context when explicitly called with the sync flag',  function () {
        var channel = Channel({}),
            ctx = { }
            f = function () { assert.equal(ctx, this); };
        channel.on('ping', f, ctx);
        channel.emitSync('ping');
    });

    it('should inject an event object containing information about the event', function () {
        var channel = Channel({}),
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
        var channel = Channel({}),
            f = function (arg, evt) {
                assert.equal('object', typeof evt);
            };
        channel.on('ping', f);
        channel.emitAsync('ping', 'foo');
    });

    it('should inject an event object containing information about the event when explicitly called with the sync flag', function () {
        var channel = Channel({}),
            f = function (arg, evt) {
                assert.equal('object', typeof evt);
            };
        channel.on('ping', f);
        channel.emitSync('ping', 'foo');
    });
});

describe('the event object, passed to callback functions', function () {

  it('should contain a reference to the callback function', function () {
    var channel = Channel({}),
        f = function (evt) {
            assert.equal(f, evt.func);
        };
    channel.on('ping', f);
    channel.emit('ping');
  });

  it('should contain a reference to the context object that was declared for the callback function', function () {
    var channel = Channel({}),
        ctx = {},
        f = function (evt) {
            assert.equal(ctx, evt.context);
        };
    channel.on('ping', f, ctx);
    channel.emit('ping');
  });

  it('should contain the event name', function () {
    var channel = Channel({}),
        f = function (evt) {
            assert.equal('ping', evt.name);
        };
    channel.on('ping', f);
    channel.emit('ping');
  });

  it('should contain a reference to the event channel on which the event was triggered', function () {
    var channel = Channel({}),
        f = function (evt) {
            assert.equal(channel, evt.channel);
        };
    channel.on('ping', f);
    channel.emit('ping');
  });

  it('should contain information about whether the callback was executed asynchronously', function () {
    var channel = Channel({}),
        f = function (evt) {
            assert.equal(true, evt.async);
        };
    channel.on('ping', f);
    channel.emit('ping');
  });

});

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

  it('should not affect public channels', function () {
    var channel = Channel('test');
    channel.on('ping', function () {
      assert(true);
    });
    channel.reset();
    channel.emit('ping');
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

describe('`unsilence` function', function () {

  it('should return the channel it was called on when called with no arguments', function () {
    var channel = Channel();
    assert.equal(channel, channel.unsilence());
  });

  it('should return the channel it was called on when called with an event type', function () {
    var channel = Channel();
    assert.equal(channel, channel.unsilence('ping'));
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

describe('Callback function execution', function () {

  it('should be synchronous if `on` and `emit` specify that they prefer synchronicity', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { foo = 'bar'; }, null, false);
    channel.emitSync('ping');
    assert.equal('bar', foo);
  });

  it('should be synchronous if `on` specifies that it prefers synchronicity and `emit` has no preference', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { foo = 'bar'; }, this, false);
    channel.emit('ping');
    assert.equal('bar', foo);
  });

  it('should be synchronous if `emit` specifies that it prefers synchronicity and `on` has no preference', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { foo = 'bar'; });
    channel.emitSync('ping');
    assert.equal('bar', foo);
  });

  it('should be asynchronous if `on` and `emit` specify that they prefer asynchronicity', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { assert.equal('bar', foo); }, null, true);
    channel.emitAsync('ping');
    foo = 'bar';
  });

  it('should be asynchronous if `on` specifies that it prefers asynchronicity and `emit` has no preference', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { assert.equal('bar', foo); }, null, true);
    channel.emit('ping');
    foo = 'bar';
  });

  it('should be asynchronous if `emit` specifies that it prefers asynchronicity and `on` has no preference', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { assert.equal('bar', foo); });
    channel.emitAsync('ping');
    foo = 'bar';
  });

  it('should be asynchronous if `on` specifies that it prefers synchronicity and `emit` prefers asynchronicity', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { assert.equal('bar', foo); }, null, true);
    channel.emitAsync('ping');
    foo = 'bar';
  });

  it('should be synchronous if `on` specifies that it prefers asynchronicity and `emit` prefers synchronicity', function () {
    var channel = Channel({}),
        foo;
    channel.on('ping', function () { foo = 'bar'; }, null, false);
    channel.emitSync('ping');
    assert.equal('bar', foo);
  });
});

describe('`isSilenced` function', function () {

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

describe('`isLocked` function', function () {

  it('should return `false` on a newly created channel when called with no arguments', function () {
    var channel = new Channel();
    assert.equal(false, channel.isLocked());
  });

  it('should return `true` on a previously locked channel when called with no arguments', function () {
    var channel = new Channel();
    channel.lock();
    assert.equal(true, channel.isLocked());
  });

  it('should return `false` on a previously unlocked channel when called with no arguments', function () {
    var channel = new Channel();
    channel.lock();
    channel.unlock();
    assert.equal(false, channel.isLocked());
  });

  it('should return `false` for an event that does not exist when called with an event name', function () {
    var channel = new Channel();
    assert.equal(false, channel.isLocked('ping'));
  });

  it('should return `false` for an event that was not locked when called with an event name', function () {
    var channel = new Channel();
    channel.on('ping', function () {});
    assert.equal(false, channel.isLocked('ping'));
  });

  it('should return `true` on a previously locked event when called with an event name', function () {
    var channel = new Channel();
    channel.lock('ping');
    assert.equal(true, channel.isLocked('ping'));
  });

  it('should return `false` on a previously unlocked event when called with an event name', function () {
    var channel = new Channel();
    channel.lock('ping');
    channel.unlock('ping');
    assert.equal(false, channel.isLocked('ping'));
  });

  it('should return `true` if the given event is not locked but the channel is', function () {
    var channel = new Channel();
    channel.lock();
    assert.equal(true, channel.isLocked('ping'));
  });
  
});

describe('`restrict` function', function () {

  it('should create an object with the `emit`, `emitSync`, `emitAsync`, `fire`, `fireSync`, `fireAsync`, `trigger`, `triggerSync`, `triggerAsync`, `publish`, `publishSync`, `publishAsync` methods when called with `\'emit\'`', function () {
    
    var channel = new Channel(),
        channel2 = channel.restrict(['emit']);

    assert.equal('function', typeof channel2.emit);
    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fire);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.trigger);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.triggerAsync);
    assert.equal('function', typeof channel2.publish);
    assert.equal('function', typeof channel2.publishSync);
    assert.equal('function', typeof channel2.publishAsync);

  });

  it('should create an object with the `emit`, `emitSync`, `emitAsync`, `fire`, `fireSync`, `fireAsync`, `trigger`, `triggerSync`, `triggerAsync`, `publish`, `publishSync`, `publishAsync` methods when called with `\'fire\'`', function () {
    
    var channel = new Channel(),
        channel2 = channel.restrict(['fire']);

    assert.equal('function', typeof channel2.emit);
    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fire);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.trigger);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.triggerAsync);
    assert.equal('function', typeof channel2.publish);
    assert.equal('function', typeof channel2.publishSync);
    assert.equal('function', typeof channel2.publishAsync);

  });

  it('should create an object with the `emit`, `emitSync`, `emitAsync`, `fire`, `fireSync`, `fireAsync`, `trigger`, `triggerSync`, `triggerAsync`, `publish`, `publishSync`, `publishAsync` methods when called with `\'trigger\'`', function () {
    
    var channel = new Channel(),
        channel2 = channel.restrict(['trigger']);

    assert.equal('function', typeof channel2.emit);
    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fire);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.trigger);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.triggerAsync);
    assert.equal('function', typeof channel2.publish);
    assert.equal('function', typeof channel2.publishSync);
    assert.equal('function', typeof channel2.publishAsync);

  });

it('should create an object with the `emit`, `emitSync`, `emitAsync`, `fire`, `fireSync`, `fireAsync`, `trigger`, `triggerSync`, `triggerAsync`, `publish`, `publishSync`, `publishAsync` methods when called with `\'publish\'`', function () {
    
    var channel = new Channel(),
        channel2 = channel.restrict(['publish']);

    assert.equal('function', typeof channel2.emit);
    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fire);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.trigger);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.triggerAsync);
    assert.equal('function', typeof channel2.publish);
    assert.equal('function', typeof channel2.publishSync);
    assert.equal('function', typeof channel2.publishAsync);

  });

  it('should create an object with the `emitSync`, `fireSync`, `triggerSync`, `publishSync` methods when called with `\'emitSync\'`', function () {
    
    var channel = new Channel(),
        channel2 = channel.restrict(['emitSync']);

    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.publishSync);

  });

  it('should create an object with the `emitSync`, `fireSync`, `triggerSync`, `publishSync` methods when called with `\'fireSync\'`', function () {
    
    var channel = new Channel(),
        channel2 = channel.restrict(['fireSync']);

    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.publishSync);

  });

  it('should create an object with the `emitSync`, `fireSync`, `triggerSync`, `publishSync` methods when called with `\'triggerSync\'`', function () {
    
    var channel = new Channel(),
        channel2 = channel.restrict(['triggerSync']);

    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.publishSync);

  });

  it('should create an object with the `emitSync`, `fireSync`, `triggerSync`, `publishSync` methods when called with `\'publishSync\'`', function () {
    
    var channel = new Channel(),
        channel2 = channel.restrict(['publishSync']);

    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.publishSync);

  });

  it('should create an object with the `emitAsync`, `fireAsync`, `triggerAsync`, `publishAsync` methods when called with `\'emitAsync\'`', function () {
    
    var channel = new Channel(),
        channel2 = channel.restrict(['emitAsync']);

    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.triggerAsync);
    assert.equal('function', typeof channel2.publishAsync);

  });

  it('should create an object with the `emitAsync`, `fireAsync`, `triggerAsync`, `publishAsync` methods when called with `\'fireAsync\'`', function () {
    
    var channel = new Channel(),
        channel2 = channel.restrict(['fireAsync']);

    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.triggerAsync);

  });

  it('should create an object with the `emitAsync`, `fireAsync`, `triggerAsync`, `publishAsync` methods when called with `\'triggerAsync\'`', function () {
    
    var channel = new Channel(),
        channel2 = channel.restrict(['triggerAsync']);

    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.triggerAsync);

  });

  it('should create an object with the `emitAsync`, `fireAsync`, `triggerAsync`, `publishAsync` methods when called with `\'publishAsync\'`', function () {
    
    var channel = new Channel(),
        channel2 = channel.restrict(['publishAsync']);

    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.triggerAsync);

  });

  it('should not have methods for asynchronous event dispatching when called with `\'emitSync\’`, `\'fireSync\’`,`\'triggerSync\’`, or `\'publishSync\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['emitSync']),
        channel3 = channel.restrict(['fireSync']),
        channel4 = channel.restrict(['triggerSync']),
        channel5 = channel.restrict(['publishSync']);

    assert.equal(undefined, channel2.emit);
    assert.equal(undefined, channel2.fire);
    assert.equal(undefined, channel2.trigger);
    assert.equal(undefined, channel2.publish);

    assert.equal(undefined, channel2.emitAsync);
    assert.equal(undefined, channel2.fireAsync);
    assert.equal(undefined, channel2.triggerAsync);
    assert.equal(undefined, channel2.publishAsync);

    assert.equal(undefined, channel3.emit);
    assert.equal(undefined, channel3.fire);
    assert.equal(undefined, channel3.trigger);
    assert.equal(undefined, channel3.publish);

    assert.equal(undefined, channel3.emitAsync);
    assert.equal(undefined, channel3.fireAsync);
    assert.equal(undefined, channel3.triggerAsync);
    assert.equal(undefined, channel3.publishAsync);

    assert.equal(undefined, channel4.emit);
    assert.equal(undefined, channel4.fire);
    assert.equal(undefined, channel4.trigger);
    assert.equal(undefined, channel4.publish);

    assert.equal(undefined, channel4.emitAsync);
    assert.equal(undefined, channel4.fireAsync);
    assert.equal(undefined, channel4.triggerAsync);
    assert.equal(undefined, channel4.publishAsync);

    assert.equal(undefined, channel5.emit);
    assert.equal(undefined, channel5.fire);
    assert.equal(undefined, channel5.trigger);
    assert.equal(undefined, channel5.publish);

    assert.equal(undefined, channel5.emitAsync);
    assert.equal(undefined, channel5.fireAsync);
    assert.equal(undefined, channel5.triggerAsync);
    assert.equal(undefined, channel5.publishAsync);

  });

  it('should not have methods for synchronous event dispatching when called with `\'emitAsync\’`, `\'fireAsync\’` or `\'triggerAsync\’`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['emitAsync']),
        channel3 = channel.restrict(['fireAsync']),
        channel4 = channel.restrict(['triggerAsync']);

    assert.equal(undefined, channel2.emit);
    assert.equal(undefined, channel2.fire);
    assert.equal(undefined, channel2.trigger);

    assert.equal(undefined, channel2.emitSync);
    assert.equal(undefined, channel2.fireSync);
    assert.equal(undefined, channel2.triggerSync);

    assert.equal(undefined, channel3.emit);
    assert.equal(undefined, channel3.fire);
    assert.equal(undefined, channel3.trigger);

    assert.equal(undefined, channel3.emitSync);
    assert.equal(undefined, channel3.fireSync);
    assert.equal(undefined, channel3.triggerSync);

    assert.equal(undefined, channel4.emit);
    assert.equal(undefined, channel4.fire);
    assert.equal(undefined, channel4.trigger);

    assert.equal(undefined, channel4.emitSync);
    assert.equal(undefined, channel4.fireSync);
    assert.equal(undefined, channel4.triggerSync);

  });

  it('should create an object with the `on`, `attach`, `subscribe` methods when called with `\'on\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['on']);

    assert.equal('function', typeof channel2.on);
    assert.equal('function', typeof channel2.attach);
    assert.equal('function', typeof channel2.subscribe);

  });

  it('should create an object with the `on`, `attach`, `subscribe` methods when called with `\'attach\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['attach']);

    assert.equal('function', typeof channel2.on);
    assert.equal('function', typeof channel2.attach);
    assert.equal('function', typeof channel2.subscribe);

  });

  it('should create an object with the `on`, `attach`, `subscribe` methods when called with `\'subscribe\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['subscribe']);

    assert.equal('function', typeof channel2.on);
    assert.equal('function', typeof channel2.attach);
    assert.equal('function', typeof channel2.subscribe);

  });

  it('should create an object with the `off`, `detach`, `unsubscribe` methods when called with `\'off\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['off']);

    assert.equal('function', typeof channel2.off);
    assert.equal('function', typeof channel2.detach);
    assert.equal('function', typeof channel2.unsubscribe)

  });

  it('should create an object with the `off`, `detach`, `unsubscribe` methods when called with `\'detach\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['detach']);

    assert.equal('function', typeof channel2.off);
    assert.equal('function', typeof channel2.detach);
    assert.equal('function', typeof channel2.unsubscribe);

  });it('should create an object with the `off`, `detach`, `unsubscribe` methods when called with `\'unsubscribe\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['unsubscribe']);

    assert.equal('function', typeof channel2.off);
    assert.equal('function', typeof channel2.detach);
    assert.equal('function', typeof channel2.unsubscribe);

  });

  it('should create an object with the `off`, `detach`, `unsubscribe` methods when called with `\'detach\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['detach']);

    assert.equal('function', typeof channel2.off);
    assert.equal('function', typeof channel2.detach);
    assert.equal('function', typeof channel2.unsubscribe);

  });

  it('should create an object with the `silence` and `unsilence` method when called with `\'silence\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['silence']);

    assert.equal('function', typeof channel2.silence);
    assert.equal('function', typeof channel2.unsilence);

  });

  it('should create an object with the `unsilence` and `silence` method when called with `\'unsilence\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['unsilence']);

    assert.equal('function', typeof channel2.unsilence);
    assert.equal('function', typeof channel2.silence);

  });

  it('should create an object with only the `silence` method when called with `\'silence\'` and `\'unsilence\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['silence'], ['unsilence']);

    assert.equal('function', typeof channel2.silence);
    assert.equal('undefined', typeof channel2.unsilence);

  });

  it('should create an object with only the `unsilence` method when called with `\'unsilence\'` and `\'silence\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['unsilence'], ['silence']);

    assert.equal('function', typeof channel2.unsilence);
    assert.equal('undefined', typeof channel2.silence);

  });

  it('should create an object with the `lock` and `unlock` method when called with `\'lock\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['lock']);

    assert.equal('function', typeof channel2.lock);

  });

  it('should create an object with the `unlock` and `lock` method when called with `\'unlock\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['unlock']);

    assert.equal('function', typeof channel2.unlock);

  });

  it('should create an object with only the `lock` method when called with `\'lock\'` and `\'unlock\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['lock'], ['unlock']);

    assert.equal('function', typeof channel2.lock);
    assert.equal('undefined', typeof channel2.unlock);

  });

  it('should create an object with only the `unlock` method when called with `\'unlock\'` and `\'lock\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['unlock'], ['lock']);

    assert.equal('function', typeof channel2.unlock);
    assert.equal('undefined', typeof channel2.lock);

  });

  it('should have the `isSilenced`, `isLocked` and `restrict` methods by default, when no prohibitions are specified', function () {

    var channel = new Channel(),
        channel2 = channel.restrict();

    assert.equal('function', typeof channel2.isSilenced);
    assert.equal('function', typeof channel2.isLocked);
    assert.equal('function', typeof channel2.restrict);

  });

  it('should prevent giving permissions to the wrapper that the target itself does not have', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(),
        channel3 = channel2.restrict(['emit']);

    assert.equal(undefined, channel3.emit);

  });

});