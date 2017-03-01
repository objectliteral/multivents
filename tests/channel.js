var assert = require('assert'),
    Channel = require('../multivents.js');

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

    it('should contain an `once` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.once);
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

});