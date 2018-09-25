var assert = require('assert'),
    Channel = require('../dist/multivents.umd.js');

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