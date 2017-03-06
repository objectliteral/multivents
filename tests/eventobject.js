var assert = require('assert'),
    Channel = require('../dist/multivents.umd.js');

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