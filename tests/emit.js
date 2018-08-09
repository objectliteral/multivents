var assert = require('assert'),
    Channel = require('../dist/multivents.umd.js');

describe('`emit` function',  function () {

    it('should return the channel it was called on when called with one argument', function () {
      var channel = Channel();
      assert.equal(channel, channel.emit('ping'));
    });

    it('should return the channel it was called on when called on a silenced channel', function () {
      var channel = Channel();
      channel.silence();
      assert.equal(channel, channel.emit('ping'));
    });

    it('should return the channel it was called on when called on a silenced event', function () {
      var channel = Channel();
      channel.silence('ping');
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

    it('should preserve a callback\'s context',  function () {
        var channel = Channel({}),
            ctx = { }
            f = function () { assert.equal(ctx, this); };
        channel.on('ping', f.bind(ctx));
        channel.emit('ping');
    });

    it('should preserve a callback\'s context when explicitly called with the async flag',  function () {
        var channel = Channel({}),
            ctx = { }
            f = function () { assert.equal(ctx, this); };
        channel.on('ping', f.bind(ctx));
        channel.emitAsync('ping');
    });

    it('should preserve a callback\'s context when explicitly called with the sync flag',  function () {
        var channel = Channel({}),
            ctx = { }
            f = function () { assert.equal(ctx, this); };
        channel.on('ping', f.bind(ctx));
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
                assert.equal(true, evt.async);
                assert.deepEqual(['foo'], evt.data);
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