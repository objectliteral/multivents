var assert = require('assert'),
    Channel = require('../dist/multivents.umd.js');

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

    it('should contain an `isSilenced` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.isSilenced);
    });

    it('should contain an `isLocked` function', function () {
      var channel = Channel({});
      assert.equal('function', typeof channel.isLocked);
    });

});